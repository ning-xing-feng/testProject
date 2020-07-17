<template>
    <!-- <div class="wrap" :style="{backgroundImage:'url(' +bgUrl+')'}"> -->
    <div class="wrap">
        <div class="topImg">
            <!-- <img class="logoImg" src="../../assets/img/logo.jpg" alt /> -->
            <div class="title">官网后台</div>
        </div>
        <div class="login-wrap">
            <!-- <div class="login-title">缝前数据管理</div> -->
            <!-- <div id="darkbannerwrap"></div> -->
            <input type="text" v-model="account" placeholder="请输入账号" />
            <input type="password" v-model="password" placeholder="请输入密码" />
            <div class="login-tips">
                <!-- <router-link to="/rechargePassword">修改密码？</router-link> -->
                <input
                    type="text"
                    @keyup.enter="login"
                    v-model="imageCode"
                    placeholder="验证码"
                    style="width:180px;margin-right:20px;"
                />
                <div class="verifyode">
                    <img :src="imgUrl" alt />
                    <div class="replace" @click="getVerifycode()">
                        <u>看不清，换一张</u>
                    </div>
                </div>
            </div>
            <div class="login-button">
                <input
                    class="btn btn-primary"
                    value="登录"
                    type="button"
                    @keyup.enter="submitForm"
                    @click="submitForm"
                />
            </div>
        </div>
    </div>
</template>

<script>
import http from '@/utils/config';
export default {
    data: function() {
        return {
            account: '',
            password: '',
            loading: false,
            imageCode: ''
        };
    },
    created() {
        // window.localStorage.removeItem('jwt');
        // Vue.http.options.headers.jwt = '';
        this.imgUrl = http.http + '/api/official/admin/login/verifyCode';
        console.log(this.imgUrl);
    },
    methods: {
        getVerifycode() {
            console.log('更换图片');
            let url = http.http + '/api/official/admin/login/verifyCode?round=' + Math.random();
            this.imgUrl = url;
            console.log('验证码', this.imgUrl);
        },
        submitForm() {
            this.loading = true;
            let param = {
                accountNo: this.account,
                pwd: this.password,
                imageCode: this.imageCode
            };
            this.$store
                .dispatch('Login', param)
                .then(res => {
                    this.$router.replace('/');
                })
                .catch(() => {
                    this.loading = false;
                });
        }
    }
};
</script>

<style scoped>
.wrap {
    height: 100%;
    background: url(../../assets/img/1.png) no-repeat center;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    z-index: 999;
}

.title {
    font-size: 26px;
    color: #fff;
    line-height: 75px;
}
.topImg image {
    width: 65px;
    height: 40px;
}
.login-wrap {
    position: relative;
    /* top: 200px; */
    /* margin: 0px auto 0 auto; */
    min-height: 420px;
    max-width: 420px;
    padding: 40px;
    background-color: #ffffff;
    /* margin-left: 60%;
  margin-right: auto; */
    margin: 0 auto;
    border-radius: 4px;
    /* overflow-x: hidden; */
    box-sizing: border-box;
}

.login-title {
    margin: 10px 0 0 -58px;
    padding: 18px 10px 18px 60px;
    background: #21b5cc;
    position: relative;
    color: #fff;
    font-size: 16px;
}

#darkbannerwrap {
    background: url(../../assets/img/1.png);
    width: 18px;
    height: 10px;
    margin: 0 0 20px -58px;
    position: relative;
}

input[type='text'],
input[type='file'],
input[type='password'],
input[type='email'],
select {
    border: 1px solid #dcdee0;
    vertical-align: middle;
    border-radius: 3px;
    height: 50px;
    padding: 0px 16px;
    font-size: 14px;
    color: #555555;
    outline: none;
    width: 90%;
    margin-bottom: 25px;
}

.login-tips {
    /* margin-top: -15px; */
    /* margin-bottom: 20px; */
    /* text-align: right; */
    /* text-decoration: none; */
    font-size: 16px;
    cursor: pointer;
    display: flex;
}
.verifyode {
    flex: 1;
}
.verifyode img {
    width: 100%;
    height: 50px;
}
.replace {
    color: #999;
    font-size: 12px;
    text-align: center;
}
.login-button input {
    padding: 12px 24px;
    margin: 0px;
    margin-top: 20px;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    width: 100%;
    cursor: pointer;
    color: #ffffff;
    background-color: #299bee;
    border-radius: 3px;
    border: none;
}
.logoImg {
    width: 107px;
    /* height: 65px; */
}
.topImg{
     text-align: center;
    margin-top: 150px;
}
</style>