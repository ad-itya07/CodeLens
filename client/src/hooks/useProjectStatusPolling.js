import { useEffect, useRef, useState } from 'react';
import { repoService } from '../services/api';

const POLLING_INTERVAL = 3000; // 3 seconds
const MAX_RETRIES = 3;

export const useProjectStatusPolling = (repos, updateRepo) => {
    const [isReconnecting, setIsReconnecting] = useState(false);
    const retryCountRef = useRef({});
    const pollIntervalsRef = useRef({});

    useEffect(() => {
        const activeRepos = repos.filter(repo =>
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

        // Start polling for new active repos
        activeRepos.forEach(repo => {
            if (!pollIntervalsRef.current[repo.id]) {
                const poll = async () => {
                    try {
                        const response = await repoService.getRepoStatus(repo.id);
                        if (response.data.success) {
                            const { project, percentage } = response.data;
                            updateRepo(repo.id, {
                                status: project.status,
                                currentStep: project.currentStep,
                                completedEntities: project.completedEntities,
                                totalEntities: project.totalEntities,
                                percent: percentage,
                                updatedAt: project.updatedAt
                            });

                            // Reset retry count on success
                            retryCountRef.current[repo.id] = 0;
                            setIsReconnecting(false);

                            // Stop polling if terminal state reached
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

                // Initial poll
                poll();

                // Set interval
                pollIntervalsRef.current[repo.id] = setInterval(poll, POLLING_INTERVAL);
            }
        });

        return () => {
            // Cleanup on unmount
            Object.values(pollIntervalsRef.current).forEach(clearInterval);
            pollIntervalsRef.current = {};
        };
    }, [repos, updateRepo]);

    return { isReconnecting };
};
