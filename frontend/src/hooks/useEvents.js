import { useState, useEffect } from 'react';

export const useEvents = () => {
    return { events: [], loading: false };
};
