import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

const useGlobal = create(
    persist((set) => ({
        employeeId: '',
        token: '',
        setEmployeeId: (employee_id: string) => set(() => ({ employeeId: employee_id })), 
        setToken: (token: string) => set(() => ({ token: token }))
    })
    ,{
        name:'global',
        storage: createJSONStorage(() => sessionStorage), 
    },
    )
);

export default useGlobal;