/**
 * 链表
 */

// 链表中的一个节点
function Node(element) {
    this.element = element;
    this.next = null;

    // 双向链表使用
    this.prev = null;
}

function LinkedList() {
    this.length = 0;
    // 头节点
    this.head = null;
}

LinkedList.prototype = {
    // 向最后插入
    append: function(element) {
        var node = new Node(element),
            current;

        if (this.head == null) {
            this.head = node;
        } else {
            current = this.head;

            // 找到最后一个节点
            while (current.next) {
                current = current.next;
            }

            // 将next置为新node;
            current.next = node;
        }

        // 更新长度
        this.length++;
    },

    // 向特定位置插入
    insert: function(position, element) {
        if (position >= 0 && position <= this.length) {
            var node = new Node(element),
                current = this.head,
                previous,
                index = 0;

            if (position === 0) { // 在第一个位置添加
                node.next = current;
                this.head = node;
            } else {
                while (index < position) {
                    previous = current;
                    current = current.next;
                    index += 1;
                }
                node.next = current;
                previous.next = node;
            }

            this.length++; //更新列表的长度
            return true;
        } else {
            return false;
        }
    },

    removeAt: function(position) {
        // 检查越界
        if (position > -1 && position < this.length) {
            var current = this.head,
                previous,
                index = 0;

            // 要移除的是头节点
            if (position === 0) {
                // 将头节点置为新的
                this.head = current.next;
            } else {
                while (index < position) {
                    previous = current;
                    current = current.next;
                    index += 1;
                }
                // 将previous与current的下一项链接起来：跳过current，从而移除它
                previous.next = current.next;
            }

            this.length--;
            return current.element;
        } else {
            return null;
        }
    },
    remove: function(element) {
        var current = this.head,
            previous,
            index = 0;

        while (current) {
            if (element === current.element) {

                // 删除的是头节点
                if (index === 0) {
                    this.head = current.next;
                } else {
                    previous.next = current.next;
                }

                this.length--;
                return true;
            }
            previous = current;
            current = current.next;
            index += 1;
        }
        return false;
    },

    indexOf: function(element) {
        var current = this.head,
            index = -1;

        while (current) {
            if (element === current.element) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    },

    isEmpty: function() {
        return this.length === 0;
    },

    size: function() {
        return this.length;
    },

    toString: function() {
        var current = this.head,
            ret = [];

        while (current) {
            ret.push(current.element);
            current = current.next;
        }
        return ret.join(' ');
    }
};

/**
 * 双向链表
 */
function DoublyLinkedList() {
    this.length = 0;
    // 头节点
    this.head = null;
    this.tail = null;
}

DoublyLinkedList.prototype = {
    // 向最后插入
    append: function(element) {
        var node = new Node(element),
            current;

        if (this.head == null) {
            this.head = node;
        } else {
            current = this.head;

            // 找到最后一个节点
            while (current.next) {
                current = current.next;
            }

            // 将next置为新node;
            current.next = node;
        }

        // 更新长度
        this.length++;
    },

    // 向特定位置插入
    insert: function(position, element) {
        if (position >= 0 && position <= this.length) {
            var node = new Node(element),
                current = this.head,
                previous,
                index = 0;

            if (position === 0) { // 在第一个位置添加
                node.next = current;
                this.head = node;
            } else {
                while (index < position) {
                    previous = current;
                    current = current.next;
                    index += 1;
                }
                node.next = current;
                previous.next = node;
            }

            this.length++; //更新列表的长度
            return true;
        } else {
            return false;
        }
    },

    removeAt: function(position) {
        // 检查越界
        if (position > -1 && position < this.length) {
            var current = this.head,
                previous,
                index = 0;

            // 要移除的是头节点
            if (position === 0) {
                // 将头节点置为新的
                this.head = current.next;
            } else {
                while (index < position) {
                    previous = current;
                    current = current.next;
                    index += 1;
                }
                // 将previous与current的下一项链接起来：跳过current，从而移除它
                previous.next = current.next;
            }

            this.length--;
            return current.element;
        } else {
            return null;
        }
    },
    remove: function(element) {
        var current = this.head,
            previous,
            index = 0;

        while (current) {
            if (element === current.element) {

                // 删除的是头节点
                if (index === 0) {
                    this.head = current.next;
                } else {
                    previous.next = current.next;
                }

                this.length--;
                return true;
            }
            previous = current;
            current = current.next;
            index += 1;
        }
        return false;
    },

    indexOf: function(element) {
        var current = this.head,
            index = -1;

        while (current) {
            if (element === current.element) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    },

    isEmpty: function() {
        return this.length === 0;
    },

    size: function() {
        return this.length;
    },

    toString: function() {
        var current = this.head,
            ret = [];

        while (current) {
            ret.push(current.element);
            current = current.next;
        }
        return ret.join(' ');
    }
};

