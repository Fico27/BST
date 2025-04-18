class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

class Tree {
  constructor(array) {
    //makes an array of unique values then puts them in acsending order
    this.array = Array.from(new Set(array)).sort((a, b) => a - b);
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);

    let root = new Node(mid);
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  insert(root, newValue) {
    if (root === null) {
      return new Node(newValue);
    }

    if (root.data === newValue) {
      return root;
    }

    if (newValue < root.data) {
      root.left = insert(root.left, newValue);
    } else if (newValue > root.data) {
      root.right = insert(root.right, newValue);
    }
    return root;
  }

  delete(root, toBeDeleted) {
    if ((root.data = toBeDeleted)) {
    }
  }

  prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
      s;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}
