import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
    employeeId: string
    token: string
  }
  
  type Action = {
    setEmployeeId: (employeeId: State['employeeId']) => void
    setToken: (token: State['token']) => void
  }
  

const useGlobal = create<State & Action>()(
    persist((set) => ({
        employeeId: '',
        token: '',
        setEmployeeId: (employee_id: string) => set(() => ({ employeeId: employee_id })), 
        setToken: (token: string) => set(() => ({ token: token })),
    })
    ,{
        name:'global',
        storage: createJSONStorage(() => sessionStorage), 
    },
    )
);

export default useGlobal;