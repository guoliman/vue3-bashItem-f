<!-- 星空背景-完整版 基于https://juejin.cn/post/7098590812069429284 -->
<template>
  <div>
    <div class="canvaszz">
      <canvas ref="canvasRef" class="background-canvas"></canvas>
    </div>

    <el-form ref="loginFormRef" :model="loginData" :rules="loginRules" class="login-form"
      style="position: relative; z-index: 1;">
      <!-- title框 -->
      <div class="flex text-white items-center py-4">
        <span class="span-line"></span>
        <span class="text-2xl flex-1 text-center">{{ $t("login.title") }}</span>
        <span class="span-line"></span>
        <lang-select class="text-white! cursor-pointer" />
      </div>

      <!-- 用户框 -->
      <el-form-item prop="username">
        <div class="flex items-center input-border">
          <div class="p-2 text-white">
            <svg-icon icon-class="user" />
          </div>
          <el-input ref="username" v-model="loginData.username" class="flex-1" size="large"
            :placeholder="$t('login.username')" name="username" />
        </div>
      </el-form-item>

      <!-- 密码框 -->
      <!-- <el-tooltip :disabled="isCapslock === false" content="Caps lock is On" placement="right"> -->
      <el-form-item prop="password">
        <div class="flex items-center input-border">
          <span class="p-2 text-white">
            <svg-icon icon-class="password" />
          </span>
          <el-input v-model="loginData.password" class="flex-1" placeholder="密码"
            :type="passwordVisible === false ? 'password' : 'input'" size="large" name="password" @keyup="checkCapslock"
            @keyup.enter="handleLogin" />
          <span class="mr-2" @click="passwordVisible = !passwordVisible">
            <svg-icon :icon-class="passwordVisible === false ? 'eye' : 'eye-open'" class="text-white cursor-pointer" />
          </span>
        </div>
      </el-form-item>
      <!-- </el-tooltip> -->

      <div class="flex justify-center">
        <!-- class="w-full"  是按钮占满格子-->
        <el-button size="default" :loading="loading" type="primary" class="transparent-button w-full"
          @click.prevent="handleLogin">
          {{ $t("login.login") }}
        </el-button>
      </div>

      <!-- <el-button size="default" :loading="loading" type="primary" class="w-20"  @click.prevent="handleLogin">{{
        $t("login.login") }}
      </el-button> -->

    </el-form>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import LangSelect from "@/components/LangSelect/index.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

// 状态管理依赖
import { useUserStore } from "@/store/modules/user";

// API依赖
import { LocationQuery, LocationQueryValue, useRoute } from "vue-router";
import { LoginData } from "@/api/auth/types";

import { ref, onMounted, onUnmounted } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton, ElTooltip } from 'element-plus';

let canvas2: HTMLCanvasElement;
let canvasRef = ref<HTMLCanvasElement | null>(null);
const stars: Star[] = [];
let count = 0;
const maxStars = 1500;  // 星星数
let isStarGenerated = false; // Flag to track star generation

function random(min: number, max?: number): number {
  if (max === undefined) {
    max = min;
    min = 0;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const maxOrbit = (x: number, y: number): number => {
  const max = Math.max(x, y);
  const diameter = Math.round(Math.sqrt(max * max + max * max));
  return diameter / 2;
};

interface Star {
  orbitRadius: number;
  radius: number;
  orbitX: number;
  orbitY: number;
  timePassed: number;
  speed: number;
  alpha: number;
  draw: () => void;
}

class StarImpl implements Star {
  orbitRadius: number;
  radius: number;
  orbitX: number;
  orbitY: number;
  timePassed: number;
  speed: number;
  alpha: number;

  constructor() {
    this.orbitRadius = 0;
    this.radius = 0;
    this.orbitX = 0;
    this.orbitY = 0;
    this.timePassed = 0;
    this.speed = 0;
    this.alpha = 0;

    count++;
    stars[count] = this;
  }

  init(): void {
    this.orbitRadius = random(maxOrbit(window.innerWidth, window.innerHeight));
    this.radius = random(60, this.orbitRadius) / 18;
    this.orbitX = window.innerWidth / 2;
    this.orbitY = window.innerHeight / 2;
    this.timePassed = random(0, maxStars);
    this.speed = random(this.orbitRadius) / 500000;
    this.alpha = random(2, 10) / 10;
  }

  draw(): void {
    const ctx = canvasRef.value?.getContext('2d');
    if (ctx) {
      const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
      const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
      const twinkle = random(10);

      if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
      }

      ctx.globalAlpha = this.alpha;
      ctx.drawImage(
        canvas2,
        x - this.radius / 2,
        y - this.radius / 2,
        this.radius,
        this.radius
      );
      this.timePassed += this.speed;
    }
  }
}

const userStore = useUserStore();
const route = useRoute();

const loading = ref(false);
const isCapslock = ref(false);
const passwordVisible = ref(false);

const loginFormRef = ref<any>();
const loginData = ref<LoginData>({
  username: "",
  password: "",
});

const loginRules = {
  username: [{ required: true, trigger: "blur" }],
  password: [{ required: true, trigger: "blur", validator: passwordValidator }],
};

function passwordValidator(rule: any, value: any, callback: any) {
  if (value.length < 2) {
    callback(new Error("密码长度不能小于2"));
  } else {
    callback();
  }
}

function checkCapslock(e: any) {
  const { key } = e;
  isCapslock.value = key && key.length === 1 && key >= "A" && key <= "Z";
}

function handleLogin() {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      userStore
        .login(loginData.value)
        .then(() => {
          const query: LocationQuery = route.query;

          const redirect = (query.redirect as LocationQueryValue) ?? "/";

          const otherQueryParams = Object.keys(query).reduce(
            (acc: any, cur: string) => {
              if (cur !== "redirect") {
                acc[cur] = query[cur];
              }
              return acc;
            },
            {}
          );

          router.push({ path: redirect, query: otherQueryParams });
        })
        .catch(() => { })
        .finally(() => {
          loading.value = false;
        });
    }
  });
}

function handleResize() {
  const canvas = canvasRef.value;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;

    const hue = 217;

    canvas2 = document.createElement('canvas');
    const ctx2 = canvas2.getContext('2d') as CanvasRenderingContext2D;
    canvas2.width = 100;
    canvas2.height = 100;
    const half = canvas2.width / 2;
    const gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#CCC');
    gradient2.addColorStop(0.1, `hsl(${hue}, 61%, 33%)`);
    gradient2.addColorStop(0.25, `hsl(${hue}, 64%, 6%)`);
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    if (!isStarGenerated) {
      for (let i = 0; i < maxStars; i++) {
        const star = new StarImpl();
        star.init();
      }
      isStarGenerated = true;
    }

    function animation(): void {
      if (ctx) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.5; //尾巴
        ctx.fillStyle = `hsla(${hue}, 64%, 6%, 2)`;
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = 'lighter';
        for (let i = 1, l = stars.length; i < l; i++) {
          stars[i].draw();
        }

        window.requestAnimationFrame(animation);
      }
    }

    animation();
  }
}

const starBackground = {
  mounted() {
    window.addEventListener('resize', handleResize);
    handleResize();
  },
  unmounted() {
    window.removeEventListener('resize', handleResize);
  }
};

onMounted(() => {
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

window.addEventListener('resize', handleResize);
</script>

<style lang="scss" scoped>
// form背景样式
.canvaszz {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

// form样式
.login-form {
  width: 420px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}

// form行间距
.el-form-item {
  background: rgb(0 0 0 / 10%);
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 5px;
  margin-bottom: 20px;
}
// input框设置
.input-border {
    /* 边框颜色为亮电色 */
  border: 1px solid rgb(47, 152, 193);
  /* 边角锐化 */
  border-radius: 4px;
}

// input框设置
.el-input {

  background: transparent;

  :deep(.el-input__wrapper) {
    padding: 0;
    background: transparent;
    box-shadow: none;

    .el-input__inner {
      color: #fff;
      background: transparent;
      border: 0;
      border-radius: 0;
      caret-color: #fff;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px transparent inset !important;
        -webkit-text-fill-color: #fff !important;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        transition: color 99999s ease-out, background-color 99999s ease-out;
        transition-delay: 99999s;
      }
    }
  }
}
// 按钮设置
.transparent-button {
  margin-top: 10px;
  // width: 300px;
  background-color: transparent !important;
  border-color: transparent !important;
  border: 1px solid rgb(47, 152, 193) !important;
  /* 边缘锐化 */
  border-radius: 4px;
  // 按钮悬浮设置
  &:hover {
  border-color: #66d9ef !important;
  color: #66d9ef;
}
}

/* span横线样式 */
.span-line {
  flex: 1;
  height: 1px;
  margin: 0 10px;
  background-image: linear-gradient(to right, transparent, rgb(47, 152, 193), transparent);
  /* 设置背景大小为100% */
  background-size: 100% 100%;
}

</style>