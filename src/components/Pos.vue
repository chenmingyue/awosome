
<template>
    <div class='pos'>
      <el-row>
        <el-col :span="7" class="pos-order" id="order-list">
          <el-tabs id="order">
              <el-tab-pane label="点餐" style="padding-left: 20px;">

                 <el-table border style="width:100%" :data="tableData" >
                     <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                     <el-table-column prop="count" label="数量" width="50"></el-table-column>
                     <el-table-column prop="price" label="金额" width="70"></el-table-column>
                     <el-table-column  label="操作" width="100" fixed="right">
                       <template slot-scope="scope">
                         <el-button type="text" size="small" @click="deleteOrderList(scope.row)">删除</el-button>
                         <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                       </template>
                   </el-table-column>
                 </el-table>

                <div>
                  数量：{{totalCount}} 个
                  总价：{{totalMoney}} 元
                </div>

              </el-tab-pane>
            <el-tab-pane label="挂单">
              点餐
            </el-tab-pane>
            <el-tab-pane label="外卖">
              点餐
            </el-tab-pane>

          </el-tabs>
          <div class="div-btn">
            <el-button type="warning" @click="postAll">挂单</el-button>
            <el-button type="danger" @click="deleteAll">删除</el-button>
            <el-button type="success" @click="checkout">结账</el-button>
          </div>
        </el-col>
        <el-col :span="17">
          <div class="often-goods">
            <div class="title">常用商品</div>
            <div class="often-goods-list">
              <ul>
                <li v-for="item in oftenGoods" @click="addOrderList(item)">
                  <span>{{item.goodsName}}</span>
                  <span class="o-price">￥{{item.price}}元</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-type" >
            <el-tabs>
                <el-tab-pane label="汉堡">
                  <div>
                    <ul class='cookList'>
                      <li v-for="goods in type0Goods" @click="addOrderList(goods)">
                        <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                        <span class="foodName">{{goods.goodsName}}</span>
                        <span class="foodPrice">￥{{goods.price}}元</span>
                      </li>
                    </ul>
                  </div>
                </el-tab-pane>
              <el-tab-pane label="小食">
                <div>
                  <ul class='cookList'>
                    <li v-for="goods in type1Goods">
                      <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="饮料">
                <div>
                  <ul class='cookList'>
                    <li v-for="goods in type2Goods">
                      <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="套餐">
                <div>
                  <ul class='cookList'>
                    <li v-for="goods in type3Goods">
                      <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}元</span>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable */
  import axios from 'axios'
  export default {
    name: 'pos',
    mounted: function () {
       var orderHeight = document.body.clientHeight
       console.log(orderHeight)
       document.getElementById('order-list').style.height = orderHeight + 'px'
     },
     data () {
       return {
         tableData: [],
         oftenGoods: [],
         type0Goods: [],
         type1Goods: [],
         type2Goods: [],
         type3Goods: [],
         totalCount:0,
         totalMoney:0,


       }
     },
    methods:{

      //添加订单列表的方法
      addOrderList(goods){
       // this.totalCount=0;
        //this.totalMoney=0;
          let isHave=false;
          //判断是否有这个商品
        for(let i=0;i<this.tableData.length;i++){
            if(this.tableData[i].goodsId==goods.goodsId){
                isHave=true;
            }
        }
        if(isHave){
            let arr=this.tableData.filter(o=>o.goodsId==goods.goodsId);
            arr[0].count++;
        }else{
            let good={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
            this.tableData.push(good);
        }
       // this.tableData.forEach(
         // (item)=>{this.totalCount+=parseInt(item.count);
        //this.totalMoney+=parseInt(item.count)*parseFloat(item.price)})
        this.getAllMoney();
      },
      deleteOrderList(goods){

          this.tableData=this.tableData.filter(o=>o.goodsId!=goods.goodsId);
        this.getAllMoney();

      },
      getAllMoney(){
        this.totalCount=0;
        this.totalMoney=0;
        if(this.tableData){
          this.tableData.forEach((element) => {
            this.totalCount+=element.count;
            this.totalMoney=this.totalMoney+(element.price*element.count);
          });
        }

      },
      deleteAll(){
          this.tableData=[];
          this.totalMoney=0;
          this.totalCount=0;
      },
      postAll(){
          axios.get('http://jspang.com/DemoApi/oftenGoods.php')
            .then(function (res) {
              this.checkout()
          })
            .catch(function () {
              this.checkout()
            })
      },
      checkout() {
        if (this.totalCount!=0) {
          this.tableData = [];
          this.totalCount = 0;
          this.totalMoney = 0;
          this.$message({
            message: '结账成功，感谢你又为店里出了一份力!',
            type: 'success'
          });

        }else{
          this.$message.error('不能空结。老板了解你急切的心情！');
        }

      }


    },
     created () {
       axios.get('http://jspang.com/DemoApi/oftenGoods.php')
         .then(response =>{
           console.log(response);
           this.oftenGoods =response.data;
         })
         .catch(error =>{
           console.log(error);
           alert('网络错误，不能访问');
         })
       axios.get('http://jspang.com/DemoApi/typeGoods.php')
         .then(response=>{
           console.log(response);
           //this.oftenGoods=response.data;
           this.type0Goods=response.data[0];
           this.type1Goods=response.data[1];
           this.type2Goods=response.data[2];
           this.type3Goods=response.data[3];

         })
         .catch(error=>{
           console.log(error);
           alert('网络错误，不能访问');
         })
     }

   }
</script>

<style>
  .pos-order{
    background-color: #f9fafc;
    border-right:1px solid #c0ccda;
  }
  #order-list{

  }
  .div-btn{
    margin-top:20px;
  }
  .title{
    height: 20px;
    border-bottom:1px solid #D3DCE6;
    background-color: #F9FAFC;
    padding:10px;
  }
  .often-goods-list{overflow: hidden}
  .often-goods-list ul li{
    list-style: none;
    float:left;
    border:1px solid #E5E9F2;
    padding:10px;
    margin:5px;
    background-color:#fff;
    cursor: pointer;
  }
  .cookList li{
    list-style: none;
    width:23%;
    border:1px solid #E5E9F2;
    height: auto;
    overflow: hidden;
    background-color:#fff;
    padding: 2px;
    float:left;
    margin: 2px;
    cursor: pointer;

  }
  .cookList li span{

    display: block;
    float:left;
  }
  .foodImg{
    width: 40%;
  }
  .foodName{
    font-size: 18px;
    padding-left: 10px;
    color:brown;

  }
  .foodPrice{
    font-size: 16px;
    padding-left: 10px;
    padding-top:10px;
  }
  .o-price{
    color:#58B7FF;
  }
  .pos .el-tabs__header{
    margin-left:20px;
  }
  .el-tabs__item.is-active {
    color: #409EFF;
    width: 120px;
    text-align: center;
  }
  #order .el-tabs__item{
    width: 108px!important;
    text-align: center;
  }

</style>
