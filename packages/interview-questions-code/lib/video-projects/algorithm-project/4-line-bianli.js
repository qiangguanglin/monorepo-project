var arr = [1,2,3,4,5,6,7,8];

// 数组遍历
function bianArr1(arr) {
    if (arr == null) return;
    for (var i = 0 ; i < arr.length ; i ++) {
        console.log(arr[i]);
    }
}

bianArr1(arr);

function Node(value) {
    this.value = value;
    this.next = null;
}

var node1 = new Node(1);
var node2 = new Node(2);
var node3 = new Node(3);
var node4 = new Node(4);
var node5 = new Node(5);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

// 链表遍历
function bianLink1(root) {//
    var temp = root;
    while(true) {
        if (temp != null) {
            console.log(temp.value);
        } else {
            break;
        }
        temp = temp.next;
    }
}

bianLink1(node1);

// 数组递归遍历
function bianArr2(arr, i) {
    if (arr == null || arr.length <= i) return;
    console.log(arr[i]);
    bianArr2(arr, i + 1);
}
bianArr2(arr, 0);

//递归遍历链表，必须有出口
function bianLink2(root) {
    if (root == null) return;
    console.log(root.value);
    bianLink2(root.next);
}

bianLink2(node1);