import { AxiosResponse } from 'axios';
import { request } from './apiRequest';
import { URLS, ProjectType, ProjectDTO } from './types';

export const projectsAPI = {
  get: (): Promise<ProjectType[]> => {
    return request.get<ProjectType[]>(URLS.PROJECTS);
  },

  post: (data: ProjectDTO): Promise<ProjectType> => {
    return request.post(`${URLS.PROJECTS}`, data);
  },

  patch: (data: ProjectDTO, id: number): Promise<ProjectType> => {
    return request.patch(`${URLS.PROJECTS}${id}/`, data);
  },

  delete: (id: number): Promise<AxiosResponse<'OK'>> => {
    return request.delete<'OK'>(`${URLS.PROJECTS}${id}/`);
  },
};
