<template>
	<view class="content">
		<view>简介</view>
		<!--display-multiple-items同时显示的滑块数量  -->
		<swiper class="swiperView" display-multiple-items='5' :current="currentCityIndex" @change="cityChange">
			<swiper-item>
				<view class="block"></view>
			</swiper-item>
			<swiper-item>
				<view class="block"></view>
			</swiper-item>
			<block v-for="(item, index) in cityList">
				<swiper-item>
					<view @click="clickCityItem(item, index)" class="block" :key="'city-'+index"
						:class="{'color': currentCityIndex === index}">{{item}}</view>
				</swiper-item>
			</block>
			<swiper-item>
				<view class="block"></view>
			</swiper-item>
			<swiper-item>
				<view class="block"></view>
			</swiper-item>
		</swiper>
		<swiper class="swiperView" display-multiple-items='5' :current="currentCountyIndex" @change="countyChange">
			<swiper-item>
				<view class="block"></view>
			</swiper-item>
			<swiper-item>
				<view class="block"></view>
			</swiper-item>
			<block v-for="(item, index) in countyList">
				<swiper-item>
					<view @click="clickCountyItem(item, index)" class="block" :key="'county-'+index"
						:class="{'color': currentCountyIndex === index}">{{item}}</view>
				</swiper-item>
			</block>
			<swiper-item>
				<view class="block"></view>
			</swiper-item>
			<swiper-item>
				<view class="block"></view>
			</swiper-item>
		</swiper>
		<view class="chart-box">
			<view class="chart-line"
				:style="`margin-top: ${pxtorpx(lineMarginTop)}rpx;height:${pxtorpx(lineHeight)}rpx`"
				v-for="(item, index) in YData" :key="index">
				<text class="chart-line-text">{{item}}</text>
				<view class="chart-line-y" :style="`height: ${pxtorpx(lineBorderHeight)}rpx`"></view>
			</view>
			<view class="chart-bar" :style="`bottom:${(pxtorpx(lineHeight/2) - pxtorpx(chartXTextHeight)) - pxtorpx(lineBorderHeight)/2}rpx;`">
				<swiper display-multiple-items='5' @change="barChange" :current="currBarIndex">
					<swiper-item v-for="(item,index) in chartData" :key="item.area" @click="clickBarItem(item, index)">
						<view class="chart-bar-content"
							:class="{'chart-bar-content-actived': currSelectedBar === index}">
							<text class="chart-bar-text">{{item.value1+item.value2}}</text>
							<view
								:style="`height: ${(pxtorpx(lineMarginTop+lineHeight)*item.value1)/gap}rpx;width:30rpx;background:green`">
							</view>
							<view
								:style="`height: ${(pxtorpx(lineMarginTop+lineHeight)*item.value2)/gap}rpx;width:30rpx;background:#FF7442`">
							</view>
							<view class="chart-x-text"
								:style="`font-size: ${pxtorpx(chartXTextSize)}rpx;height: ${pxtorpx(chartXTextHeight)}rpx;line-height: ${pxtorpx(chartXTextHeight)}rpx`">
								{{item.area}}
							</view>
							<view class="test"></view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="slider-box">
			<slider :value="currBarIndex" block-size="15" activeColor="#FFCC33" backgroundColor="#DAEAFF" :step="1"
				:max="1*(chartData.length - 5)" :min="0" @change="sliderChange" />
		</view>
		{{chartData.length-5}}
		<custom-tabbar :current-page="0"></custom-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			const chartXTextSize = 12
			return {
				currentCityIndex: 0,
				currentCountyIndex: 0,
				cityList: ['成都市', '绵阳市', '简阳市', '德阳市', '自贡市', '眉山市', '广安市', '广元市', '遂宁市'],
				countyList: ['金牛区', '武侯区', '双流区', '成华区', '高新区', '青羊区', '天府新区', '青白江区', '新都区', '郫都区'],
				chartData: [{
					area: '成都市',
					value1: ~~(Math.random() * 1000),
					value2: ~~(Math.random() * 1000)
				}, {
					area: '绵阳市',
					value1: 1600,
					value2: 50
				}, {
					area: '简阳市',
					value1: ~~(Math.random() * 1000),
					value2: ~~(Math.random() * 1000)
				}, {
					area: '德阳市',
					value1: ~~(Math.random() * 1000),
					value2: ~~(Math.random() * 1000)
				}, {
					area: '自贡市',
					value1: ~~(Math.random() * 1000),
					value2: ~~(Math.random() * 1000)
				}, {
					area: '眉山市',
					value1: ~~(Math.random() * 1000),
					value2: ~~(Math.random() * 1000)
				}, {
					area: '广安市',
					value1: ~~(Math.random() * 1000),
					value2: ~~(Math.random() * 1000)
				}, {
					area: '广元市',
					value1: ~~(Math.random() * 1000),
					value2: ~~(Math.random() * 1000)
				}, {
					area: '遂宁市',
					value1: ~~(Math.random() * 1000),
					value2: ~~(Math.random() * 1000)
				}],
				YData: [],
				gap: 0,
				chartXTextHeight: chartXTextSize + 2,
				chartXTextSize,
				lineMarginTop: 19,
				lineHeight: 15,
				lineBorderHeight: 1,
				currBarIndex: 0,
				currSelectedBar: 0,
			}
		},
		onLoad() {

		},
		mounted() {
			this.getYData()
		},
		methods: {
			sliderChange(event) {
				console.log(event)
				this.currBarIndex = event.detail.value
			},
			clickBarItem(item, index) {
				if (index <= (this.chartData.length - 5)) {
					this.currBarIndex = index
				}
				this.currSelectedBar = index
			},
			// 单位换算
			pxtorpx(px) {
				// rpx转px
				// uni.upx2px(rpx的值)
				// px转rpx
				// px的值/(uni.upx2px(10)/10)
				return px / (uni.upx2px(100) / 100)
			},
			getYData() {
				let maxSumValue = 0
				this.chartData.forEach(({
					value1,
					value2
				}) => {
					const sum = value1 + value2
					if (sum > maxSumValue) {
						maxSumValue = sum
					}
				})
				let gap
				if (maxSumValue % 5 === 0) {
					gap = maxSumValue / 5
				} else {
					gap = ~~(maxSumValue / 5) + 1
				}
				const YData = []
				for (let i = 0; i <= 5; i++) {
					YData.push(i * gap)
				}
				console.log(gap, maxSumValue)
				this.YData = YData.reverse()
				this.gap = gap
			},
			barChange(e) {
				console.log(e, '=====e')
				const {
					detail
				} = e
				this.currBarIndex = detail.current
			},
			cityChange(e) {
				const {
					detail
				} = e
				console.log(e, '=====e')
				this.currentCityIndex = detail.current
			},
			clickCityItem(item, index) {
				this.currentCityIndex = index
				// 重新获取countyList
				this.currentCountyIndex = 0

			},
			countyChange(e) {
				const {
					detail
				} = e
				this.currentCountyIndex = detail.current
			},
			clickCountyItem(item, index) {
				this.currentCountyIndex = index
			}
		}
	}
</script>

<style>
	.slider-box {
		padding: 10rpx 30rpx;
		margin: 40rpx 20rpx;
		border: 2rpx solid skyblue;
		border-radius: 40rpx;
	}

	.slider-box uni-slider {
		margin: 0;
	}

	/deep/ uni-slider .uni-slider-thumb {
		box-shadow: 0 0 12rpx #296FFF;
	}


	.chart-box {
		border: 2rpx solid pink;
		margin: 10rpx;
		position: relative;
		height: 100%;
	}

	.chart-bar {
		height: 100%;
		position: absolute;
		width: 80%;
		left: 105rpx;
	}

	.chart-bar uni-swiper-item {
		display: flex;
		align-items: flex-end;
		overflow: unset;
	}

	.chart-bar-content {
		width: 85%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.chart-bar-content-actived:nth-child(1) {
		transform: translateX(4rpx);
	}

	.chart-bar-content-actived .chart-x-text {
		width: 95%;
		text-align: center;
		/* border-radius: 20rpx;
		border-bottom: 2rpx solid #c2cedfad; */
	}

	.chart-bar-content-actived {
		background: #ffffff;
		border-radius: 20rpx;
		box-shadow: 0px 0px 16rpx 0px #c2cedf;
	}

	.chart-bar uni-swiper {
		height: 100%;
		overflow: unset;
	}

	.chart-line {
		display: flex;
		align-items: center;
	}

	.chart-line-y {
		width: 80%;
		background-color: blue;
	}

	.chart-line-text {
		text-align: right;
		width: 90rpx;
		margin-right: 10rpx;
	}

	.chart-bar-text {
		font-size: 16rpx;
	}


	.swiperView {
		width: 100%;
		height: 100rpx;
	}

	.color {
		color: red
	}

	.block {
		height: 100rpx;
		line-height: 100rpx;
		background-color: aquamarine;
		text-align: center;
	}
</style>
