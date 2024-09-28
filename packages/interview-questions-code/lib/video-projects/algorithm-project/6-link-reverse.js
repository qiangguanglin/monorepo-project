function Node(value) {
    this.value = value
    this.next = null
}

const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);
const node5 = new Node(5);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

// 遍历方法逆置链表
function reverseLink1(root) { 
    let pre = null
    let next = null
    let cur = root
    while (cur !== null) { 
        next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
}
let res1 = reverseLink1(node1);
while (res1 !== null) { 
    console.log(res1.value)
    res1 = res1.next
}

// 递归的方法逆置链表
function reverseLink2(root, pre) { 
    if (root === null) return pre
    const next = root.next // 存储下一节点，相当于下一节点的头节点
    root.next = pre // 当前节点指向上一节点
    return reverseLink2(next, root) // 将下一节点和当前节点传递给下一次
}

let res2 = reverseLink2(node1, null);
while (res2 !== null) { 
    console.log(res2.value)
    res2 = res2.next
}