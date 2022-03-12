import { Compare, defaultCompare } from '../../utils'
import { Node } from '../../module/node'

export default class BinarySearchTree {
    constructor(CompareFn = defaultCompare) {
        this.CompareFn = CompareFn
        this.root = null
    }

    insert(key) {
        if (this.root == null) {
            this.root = new Node(key)
        } else {
            this.insertNode(this.root, key)
        }
    }

    insertNode(node, key) {
        if (this.CompareFn(key, node.key) === Compare.EQUALS) {
            if (node.left == null) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else {
            if (node.right == null) {
                node.right = new Node(key)
            } else {
                this.insertNode(node.right, key)
            }
        }
    }
}