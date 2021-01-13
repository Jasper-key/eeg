# egg-v0.2

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


20201231

中间图表：放大缩小、加分隔（5s一隔，一行30s）

底部图表：放大缩小、标识牌

config字段解释

mark_7：当每组数据为7条时，数据title显示此数组的数值
marks：当每组数据小于7条时，数据title显示此数组的数值
mark_color：每条数据的颜色值
algorithms：算法的名称和文件名（分类标签）
known_result：已知结果文件名
unit_number：单位值（uv），会影响y轴的最大最小值
hz_num： 点数，30*此值=每条通道的y轴点数

