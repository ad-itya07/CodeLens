import { useEffect, useRef, useState } from 'react';
import { repoService } from '../services/api';

const POLLING_INTERVAL = 3000; // 3 seconds
const MAX_RETRIES = 3;

export const useProjectStatusPolling = (repos, updateRepo) => {
    const [isReconnecting, setIsReconnecting] = useState(false);
    const retryCountRef = useRef({});
    const pollIntervalsRef = useRef({});

    // Keep a ref to the latest repos and updateRepo so the polling
    // callbacks always see fresh values without being in the dep array.
    // This prevents `repos` changing (due to updateRepo → setRepos) from
    // re-firing the effect and triggering a spurious extra poll() call.
    const reposRef = useRef(repos);
    const updateRepoRef = useRef(updateRepo);
    useEffect(() => { reposRef.current = repos; }, [repos]);
    useEffect(() => { updateRepoRef.current = updateRepo; }, [updateRepo]);

    useEffect(() => {
        const syncIntervals = () => {
            const activeRepos = reposRef.current.filter(repo =>
                ['PENDING', 'PARSING', 'EMBEDDING'].includes(repo.status?.toUpperCase())
            );

            // Clear intervals for repos that are no longer active
            Object.keys(pollIntervalsRef.current).forEach(repoId => {
                if (!activeRepos.find(r => r.id === repoId)) {
                    clearInterval(pollIntervalsRef.current[repoId]);
                    delete pollIntervalsRef.current[repoId];
                    delete retryCountRef.current[repoId];
                }
            });

            // Start polling for newly active repos
            activeRepos.forEach(repo => {
                if (pollIntervalsRef.current[repo.id]) return; // already polling

                const poll = async () => {
                    try {
                        const response = await repoService.getRepoStatus(repo.id);
                        if (response.data.success) {
                            const { project, percentage } = response.data;
                            updateRepoRef.current(repo.id, {
                                status: project.status,
                                currentStep: project.currentStep,
                                completedEntities: project.completedEntities,
                                totalEntities: project.totalEntities,
                                percent: percentage,
                                updatedAt: project.updatedAt
                            });

                            retryCountRef.current[repo.id] = 0;
                            setIsReconnecting(false);

                            // Stop polling once terminal state is reached
                            if (['READY', 'FAILED'].includes(project.status?.toUpperCase())) {
                                clearInterval(pollIntervalsRef.current[repo.id]);
                                delete pollIntervalsRef.current[repo.id];
                            }
                        }
                    } catch (error) {
                        console.error(`Polling failed for repo ${repo.id}:`, error);
                        retryCountRef.current[repo.id] = (retryCountRef.current[repo.id] || 0) + 1;
                        if (retryCountRef.current[repo.id] >= MAX_RETRIES) {
                            setIsReconnecting(true);
                        }
                    }
                };

                // Fire once immediately, then on the interval
                poll();
                pollIntervalsRef.current[repo.id] = setInterval(poll, POLLING_INTERVAL);
            });
        };

        // Run an initial sync, then re-sync whenever repos list length changes
        // (a repo was added or moved to terminal state) — NOT on every status update.
        syncIntervals();
        const managementInterval = setInterval(syncIntervals, POLLING_INTERVAL);

        return () => {
            clearInterval(managementInterval);
            Object.values(pollIntervalsRef.current).forEach(clearInterval);
            pollIntervalsRef.current = {};
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // ← run once on mount; refs keep everything up to date

    // Re-sync when the number of repos changes (new repo added / repo finished)
    const prevRepoCountRef = useRef(repos.length);
    useEffect(() => {
        if (repos.length !== prevRepoCountRef.current) {
            prevRepoCountRef.current = repos.length;
            // The management interval inside the main effect will pick this up
            // on its next tick via reposRef.current — no extra poll needed here.
        }
    }, [repos.length]);

    return { isReconnecting };
};
