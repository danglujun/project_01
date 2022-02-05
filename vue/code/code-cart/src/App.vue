<template>
  <div class="app-container">
    <es-header title="购物车案例"></es-header>
    <es-goods v-for="item in goodslist" :key="item.id" :id="item.id" :title="item.goods_name"></es-goods>
    <es-footer @fullChange="onFullStateChange"></es-footer>
  </div>
</template>

<script>
import EsHeader from './components/es-header/EsHeader.vue'
import EsFooter from './components/es-footer/EsFooter.vue'
import EsGoods from './components/ed-goods/EsGoods.vue'

export default {
  name: 'MyApp',
  data() {
    return {
      // 商品列表的数据
      goodslist: []
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 获取商品列表数据的方法
    async getGoodsList() {
      const { data: res } = await this.$http.get('/api/cart')
      // console.log(res)
      if (res.status !== 200) return alert('请求商品列表失败！')
      this.goodslist = res.list
    },
    // 监听全选按钮的变化
    onFullStateChange(isFull) {
      console.log(isFull)
    }
  },
  components: {
    EsHeader,
    EsFooter,
    EsGoods
  }
}
</script>

<style lang="less" scoped>
.app-container {
  padding-top: 45px;
}
</style>
