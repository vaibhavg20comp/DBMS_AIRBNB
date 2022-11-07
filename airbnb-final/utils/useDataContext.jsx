import { useContext } from 'react';
import { DataContext } from './store';

export const useDataContext = () => useContext(DataContext);
