import { AxiosResponse } from 'axios';
import { request } from './apiRequest';
import { URLS, ProjectType } from './types';

export const projectsAPI = {
  get: (): Promise<ProjectType[]> => {
    return request.get<ProjectType[]>(URLS.PROJECTS);
  },

  post: (data: Omit<ProjectType, 'id' | 'owner'>): Promise<ProjectType> => {
    return request.post(`${URLS.PROJECTS}`, data);
  },

  patch: (data: ProjectType): Promise<ProjectType> => {
    return request.patch<ProjectType, ProjectType>(
      `${URLS.PROJECTS}/${data.id}`,
      data,
    );
  },

  delete: (id: number): Promise<AxiosResponse<'OK'>> => {
    return request.delete<'OK'>(`${URLS.PROJECTS}/${id}`);
  },
};
