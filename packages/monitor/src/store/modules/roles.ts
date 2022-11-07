import { defineStore } from 'pinia';
import { ref } from 'vue'

interface Role {
  isLogin: boolean,
  level?: number[],
  token?: string
}
const id = 'roles'

export const useRoles = defineStore(id, () => {
    let role = ref<Role>({
      isLogin: false,
      level: []
    })
    const login = (token: string, level: number[]) => {
      role.value.isLogin = true
      role.value.level = level
      role.value.token = token
    }
    const logout = () => {
      role.value.isLogin = false
      role.value.level = []
      role.value.token = ''
    }
    return {
      role,
      login,
      logout
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage
        }
      ]
    }
  }
)