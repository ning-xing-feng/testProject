import {
    login
} from '@/api'
import {
    getToken,
    setToken
} from '@/utils/auth'


const state = {
    token: getToken()
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    }
}

const actions = {
    //登录
    Login({
        commit
    }, userInfo) {
        console.log('userInfo', userInfo)
        const {
            loginAccount,
            loginPwd
        } = userInfo

        return new Promise((resolve, reject) => {
            console.log('开始执行了')
            login(userInfo).then(res => {
                console.log('登录登录登录会发生开发和', res)
                const data = res.data
                sessionStorage.setItem('token', res.data.sessionId)
                sessionStorage.setItem('userId', res.data.id)
                sessionStorage.setItem('userName',res.data.accountNo)
                resolve(res)
            }).catch(error => {
                console.log('登录失败', error)
                reject(error)
            })
        })
    }
}

export default {
    actions,
    state,
    mutations
}