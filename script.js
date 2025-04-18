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

    let root = new Node(array[mid]);
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  insert(root, newValue) {
    if (root === null) {
      return new Node(newValue);
    }

    if (newValue < root.data) {
      root.left = this.insert(root.left, newValue);
    } else if (newValue > root.data) {
      root.right = this.insert(root.right, newValue);
    }
    return root;
  }

  delete(value) {
    this.root = this.deleteRec(this.root, value);
  }

  deleteRec(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      node.left = this.deleteRec(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteRec(node.right, value);
    } else {
      if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      } else {
        // In the case of two. I need to find the next highest value. which would be the right subtree left node(if it exists)
        let nextHighest = this.findNextHighest(node.right);
        node.data = nextHighest.data;
        //delete the value in the tree and replace the original deleted node with the next highest.
        node.right = this.deleteRec(node.right, nextHighest.data);
      }
    }
    return node;
  }

  findNextHighest(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  find(value, root = this.root) {
    if (root === null) {
      return null;
    }

    if (value < root.data) {
      return this.find(value, root.left);
    } else if (value > root.data) {
      return this.find(value, root.right);
    } else {
      return root;
    }
  }

  prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
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
