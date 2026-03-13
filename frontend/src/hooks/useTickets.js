import { useState, useEffect } from 'react';

export const useTickets = () => {
    return { tickets: [], loading: false };
};
