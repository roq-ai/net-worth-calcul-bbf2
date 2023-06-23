import axios from 'axios';
import queryString from 'query-string';
import { FinancialInformationInterface, FinancialInformationGetQueryInterface } from 'interfaces/financial-information';
import { GetQueryInterface } from '../../interfaces';

export const getFinancialInformations = async (query?: FinancialInformationGetQueryInterface) => {
  const response = await axios.get(`/api/financial-informations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFinancialInformation = async (financialInformation: FinancialInformationInterface) => {
  const response = await axios.post('/api/financial-informations', financialInformation);
  return response.data;
};

export const updateFinancialInformationById = async (
  id: string,
  financialInformation: FinancialInformationInterface,
) => {
  const response = await axios.put(`/api/financial-informations/${id}`, financialInformation);
  return response.data;
};

export const getFinancialInformationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/financial-informations/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteFinancialInformationById = async (id: string) => {
  const response = await axios.delete(`/api/financial-informations/${id}`);
  return response.data;
};
