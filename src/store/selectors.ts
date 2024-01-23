import { createSelector } from '@reduxjs/toolkit';

const selectObjects = (state: WeatherDataState) => state.weatherInfos;

export const selectObjectById = (name: string) =>
  createSelector(selectObjects, objects => objects.find(obj => obj.name === name));