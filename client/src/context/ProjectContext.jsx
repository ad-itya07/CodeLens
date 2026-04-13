import React, { createContext, useState, useEffect, useContext } from 'react';
import { repoService, queryService } from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const { user } = useAuth();
    const [repos, setRepos] = useState([]);
    const [activeRepo, setActiveRepo] = useState(null);
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (user) {
            initialFetch();
        } else {
            setRepos([]);
            setActiveRepo(null);
            setQueries([]);
        }
    }, [user]);

    const initialFetch = async () => {
        setIsFetching(true);
        await Promise.all([fetchRepos(), fetchQueries()]);
        setIsFetching(false);
    };

    const fetchRepos = async () => {
        try {
            const response = await repoService.getRepos();
            setRepos(response.data.projects || []);
        } catch (error) {
            console.error('Failed to fetch repos:', error);
        }
    };

    const fetchQueries = async () => {
        try {
            const response = await queryService.getQueries();
            setQueries(response.data.questions || []);
        } catch (error) {
            console.error('Failed to fetch queries:', error);
        }
    };

    const addRepo = async (githubUrl) => {
        setLoading(true);
        try {
            const response = await repoService.addRepo({ githubUrl });

            if (response.data.message === "Project already exists!") {
                toast.error('This repository has already been added');
                return null;
            }

            const newRepo = {
                id: response.data.projectId,
                repoUrl: githubUrl,
                status: 'PENDING',
            };
            setRepos((prev) => [...prev, newRepo]);
            toast.success('Repository added and indexing started');
            return newRepo;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add repository');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const askQuestion = async (projectId, query) => {
        setLoading(true);
        try {
            const response = await queryService.askQuestion({ projectId, query });
            const newQuery = {
                id: Date.now(),
                question: query,
                answer: response.data.answer,
                sources: response.data.codeResults,
                repoId: projectId,
                createdAt: new Date().toISOString(),
            };
            setQueries((prev) => [newQuery, ...prev]);
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to get answer');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const saveQuery = async (data) => {
        try {
            const response = await queryService.saveQuery(data);
            if (response.data.success) {
                setQueries((prev) => [response.data.question, ...prev]);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to save query:', error);
            return false;
        }
    };

    return (
        <ProjectContext.Provider
            value={{
                repos,
                activeRepo,
                setActiveRepo,
                queries,
                loading,
                isFetching,
                addRepo,
                askQuestion,
                saveQuery,
                fetchRepos,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => useContext(ProjectContext);
