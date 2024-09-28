/**
 * 最小生成树问题
 * 两个算法：Prim(普利姆算法&加点法)和Kruskal(克鲁斯卡尔算法&加边法)
 * 
 * 希望将所有村庄都联通，但是花费最少
 * 图片链接(../assets/minimum-spanning-tree-img.png)
 */

/**
 * 普利姆算法（加点法）
 * 1.任选一个点作为起点
 * 2.找到已当前选中点为起点路径最短的边
 * 3.如果这个边的另一端没有被联通进来，那么就连接
 * 4.如果这个边的另一端也早被连进来了，则看倒数第二短的边
 * 5.重复2-4直到将所有点联通为止
 */

/**
 * 克鲁斯卡尔算法（加边法）
 * 1.选择最短的边进行连接
 * 2.要保证边连接的两端至少有一个点是新的点
 * 3.或者这个边是将两个部落（已经连接的点组成部落）进行连接的
 * 4.重复1-3直到所有点联通
 */

/**
 * 表示一张图可以用点集合和边集合
 * 列一个表格，表格行和列表头都是点，表格中间的单元格是表示点和点之间的关系，比如：距离
 *    A   B   C   D   E
 * A  0   4   7  max max
 * B  4   0   8   6  max
 * C  7   8   0   5  max
 * D max  6   5   0   7
 * E max max max  7   0
 */
const max = 100000
const distance = [
    [0, 4, 7, max, max],
    [4, 0, 8, 6, max],
    [7, 8, 0, 5, max],
    [max, 6, 5, 0, 7],
    [max, max, max, 7, 0],
];
function Node(value) { 
    this.value = value;
    this.neighbors = [];
}
const a = new Node('A')
const b = new Node('B')
const c = new Node('C')
const d = new Node('D')
const e = new Node('E')
const pointSet = [a, b, c, d, e]

function getMinDisNode(pointSet, distance, nowNodeSet) { // 获取当前节点的最小边
    let tempMinIndexI = -1;
    let tempMinIndexJ = -1; // 获取对应距离行的最小边的位置
    for (let i = 0; i < nowNodeSet.length; i++) { // 选中节点
        let tempI = pointSet.findIndex(v => v.value === nowNodeSet[i].value) // 获取选中节点的位置，可用户获取距离的二维数组第几行
        if (tempI !== -1) { // 存在则继续
            let tempMinJ = 0;
            for (let j = 0; j < distance[tempI].length; j++) {
                const tempNode = nowNodeSet.find(v => v.value === pointSet[j].value); // 判断当前节点是否已经存在
                if (distance[tempI][tempMinJ] >= distance[tempI][j] && !tempNode) { // 判断相邻两个点大小关系
                    tempMinJ = j;
                    if (tempMinIndexI === -1 && tempMinIndexJ === -1 || distance[tempMinIndexI][tempMinIndexJ] >= distance[tempI][j]) { 
                        tempMinIndexI = tempI;
                        tempMinIndexJ = j;
                    }
                }
            }
            
        } else { 
            return null;
        }
    }
    if (tempMinIndexJ >= 0 && tempMinIndexI >= 0) { // 找到最小边对应位置，并将节点存储
        const addPoint = pointSet[tempMinIndexJ];
        const tempNode = nowNodeSet.find(v => v.value === pointSet[tempMinIndexI].value); // 找到对应的node
        tempNode.neighbors.push(addPoint); // 将node添加进去邻居中，因为是双线的，所以需要两边添加
        addPoint.neighbors.push(tempNode);
        return addPoint;
    } else {
        return null;
    }
}
// 普利姆算法（加点法）
function prim(pointSet, distance, start) { 
    const nowNodeSet = []
    nowNodeSet.push(start)
    while (nowNodeSet.length < pointSet.length) { 
        const minDisNode = getMinDisNode(pointSet, distance, nowNodeSet)
        nowNodeSet.push(minDisNode)
    }
    return nowNodeSet
}
const res = prim(pointSet, distance, c)
console.log('prim====>>>>>', res);
res.forEach(v => { // 打印邻居
    console.log(v.value, v.neighbors.map(v => v.value))
});

// 克鲁斯卡尔算法(加边法)
function canLink(resList, beginNode, endNode) { 
    // 两端的节点都是新节点，可以连接
    // beginNode不在A部落，endNode在部落A，可以连接，将beginNode加入到部落A
    // beginNode在部落A，endNode不在部落A，key连接，将endNode加入到部落A
    // beginNode在部落A，endNode在部落B，可以连接，将两个部落合并
    // beginNode和endNode在同一个部落，不可以连接
    let beginNodeIn = null
    let endNodeIn = null
    for (let i = 0; i < resList.length; i++) { 
        if (resList[i].indexOf(beginNode) > -1) { 
            beginNodeIn = resList[i] || null // 需要兜底null，因为undefined在三等于情况是false，在二等于情况是true
        }
        if (resList[i].indexOf(endNode) > -1) { 
            endNodeIn = resList[i] || null
        }
    }
    if (beginNodeIn !== null && endNodeIn !== null && beginNodeIn === endNodeIn) { 
        return false
    }
    return true
}

function link(resList, beginNode, endNode) {
    let beginNodeIn = null
    let endNodeIn = null
    for (let i = 0; i < resList.length; i++) { 
        if (resList[i].indexOf(beginNode) > -1) { 
            beginNodeIn = resList[i] || null
        }
        if (resList[i].indexOf(endNode) > -1) { 
            endNodeIn = resList[i] || null
        }
    }
    if (beginNodeIn === null && endNodeIn === null) { // 两端的节点都是新节点，可以连接
        const newArr = [beginNode, endNode];
        resList.push(newArr);
    } else if (beginNodeIn === null && endNodeIn !== null) { // beginNode不在A部落，endNode在部落A，可以连接，将beginNode加入到部落A
        endNodeIn.push(beginNode);
    } else if (beginNodeIn !== null && endNodeIn === null) { // beginNode在部落A，endNode不在部落A，可以连接，将endNode加入到部落A
        beginNodeIn.push(endNode);
    } else if(beginNodeIn !== null && endNodeIn !== null) { // beginNode在部落A，endNode在部落B，可以连接，将两个部落合并
        const newArr = beginNodeIn.concat(endNodeIn)
        resList.push(newArr)
        resList.splice(beginNodeIn, 1)
        resList.splice(endNodeIn, 1)
    }
    beginNode.neighbors.push(endNode)
    endNode.neighbors.push(beginNode)
}

function Kruskal(pointSet, distance) { 
    const resList = [] // 二维数组，每个元素是一个部落，部落中每个元素是一个节点
    let beginNode = null
    let endNode = null
    while (true) { 
        let minDis = max // 需要重置为max，因为每次循环找到的应该是最小的边，并且不在resList中，不然会导致第一次选择了最小边下一次的时候就找不到最小边了
        for (let i = 0; i < distance.length; i++) { 
            for (let j = 0; j < distance[i].length; j++) { 
                const tempBeginNode = pointSet[i]
                const tempEndNode = pointSet[j]
                if (i !== j && distance[i][j] < minDis && canLink(resList, tempBeginNode, tempEndNode)) { 
                    beginNode = tempBeginNode // 找到最小边的开始节点
                    endNode = tempEndNode // 找到最小边的结束节点
                    minDis = distance[i][j] // 更新最小距离
                }
            }
        }
        link(resList, beginNode, endNode)
        if (resList.length === 1 && resList[0].length === pointSet.length) { // 全部连接成一个部落，并且部落的长度要等于所有节点数
            break
        }
    }
    return resList[0]
}
const resKruskal = Kruskal(pointSet, distance, )
console.log('resKruskal====>>>>>', resKruskal);
resKruskal.forEach(v => { // 打印邻居
    console.log(v.value, v.neighbors.map(v => v.value))
});