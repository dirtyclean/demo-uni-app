<template>
	<view class="tabbar-container">
		<block>
			<view class="tabbar-item" v-for="(item, index) in tabbarList" :class="[item.centerItem ? ' center-item' : '']" @click="changeItem(item)">
				<view class="item-top"><image :src="currentItem == item.id ? item.selectIcon : item.icon"></image></view>
				<view class="item-bottom" :class="[currentItem == item.id ? 'item-active' : '']">
					<text>{{ item.text }}</text>
				</view>
			</view>
		</block>
		<!-- 中心的圆 -->
		<view class="center-circle-bottom"></view>
		<view class="center-circle-top"></view>
	</view>
</template>
 
<script>
export default {
	props: {
		currentPage: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			currentItem: 0,
			tabbarList: [
				{
					id: 0,
					path: '/pages/index/index',
					icon: '/static/home.png',
					selectIcon: '/static/homeSelected.png',
					text: '简介',
					centerItem: false
				},
				{
					id: 1,
					path: '/pages/discount/discount',
					icon: '/static/gift.png',
					selectIcon: '/static/giftSelected.png',
					text: '优惠',
					centerItem: false
				},
				{
					id: 2,
					path: '/pages/code/code',
					icon: '/static/code.png',
					selectIcon: '/static/codeSelected.png',
					text: '二维码',
					centerItem: true
				},
				{
					id: 3,
					path: '/pages/search/search',
					icon: '/static/search.png',
					selectIcon: '/static/searchSelected.png',
					text: '探索',
					centerItem: false
				},
				{
					id: 4,
					path: '/pages/mine/mine',
					icon: '/static/mine.png',
					selectIcon: '/static/mineSelected.png',
					text: '我的',
					centerItem: false
				}
			]
		};
	},
	mounted() {
		this.currentItem = this.currentPage;
		uni.hideTabBar();
	},
	methods: {
		changeItem(item) {
			let _this = this;
			//_this.currentItem = item.id;
			uni.switchTab({
				url: item.path
			});
		}
	}
};
</script>
<style>
view {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}
.center-circle-top {
	width: 100rpx;
	height: 50rpx;
	position: absolute;
	top: -50rpx;
	border-radius: 50%;
	border: 10rpx solid #fff;
	box-shadow: 0 0 10rpx #fff;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 50rpx 50rpx 0 0;
	line-height: 50rpx;
}
.center-circle-bottom {
	width: 100rpx;
	height: 50rpx;
	position: absolute;
	top: -2rpx;
	border-radius: 50%;
	box-shadow: 0 0 10rpx #C2CEDF;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 0 0px 50rpx 50rpx;
	line-height: 50rpx;
}
.tabbar-container {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 110rpx;
	box-shadow: 0 0 10rpx #C2CEDF;
	display: flex;
	align-items: center;
	padding: 5rpx 0;
	color: #999999;
}
.tabbar-container .tabbar-item {
	width: 20%;
	height: 100rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
}
.tabbar-container .item-active {
	color: #f00;
}
.tabbar-container .center-item {
	display: block;
	position: relative;
}
.tabbar-container .tabbar-item .item-top {
	width: 70rpx;
	height: 70rpx;
	padding: 10rpx;
}
.tabbar-container .center-item .item-top {
	flex-shrink: 0;
	width: 90rpx;
	height: 90rpx;
	position: absolute;
	top: -50rpx;
	border-radius: 50%;
	left: calc(50% + 2rpx);
	transform: translateX(-50%);
	background-color: #fff;
	z-index: 1;
}
.tabbar-container .tabbar-item .item-top image {
	width: 100%;
	height: 100%;
}
.tabbar-container .tabbar-item .item-bottom {
	font-size: 28rpx;
	width: 100%;
}
.tabbar-container .center-item .item-bottom {
	position: absolute;
	bottom: 5rpx;
}
</style>