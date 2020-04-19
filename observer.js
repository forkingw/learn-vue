let data = {
    person: {
        name: "for",
        age: 18
    },
    interesting: ["read", "paint", "sing", "eat snack"],
    color: "red",
    sky: "blue",
    number: 1000,
    student: "like school"
}

// 保存原本的数组原型
const originalArrayPrototype = Array.prototype;
// 以原本的数组原型创建对象
const newArrayPrototype = Object.create(originalArrayPrototype);
// 改写数组上的方法
const meathodToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'] 
meathodToPatch.forEach(method => {
    newArrayPrototype[method] = function () {
        originalArrayPrototype[method].call(this, ...arguments);
        render();
    }
});

/**
 * 监听对象，数据变化后，渲染页面
 * @param {Object}} data 需要被监听的对象
 * @param {String} key 对象的属性名称
 * @param {*} value 对象的值
 */
function defineRective(data, key, value) {
    observer(value);
    Object.defineProperty(data, key, {
        get() {
            return value;
        },
        set(val) {
            value = val;
            render();
        }
    })
}

/**
 * 监听数据
 * @param {*} data 监听的对象
 */
function observer(data) {
    if (Array.isArray(data)) {
        data.__proto__ = newArrayPrototype;
        return;
    }
    if (typeof data !== "object") {
        return;
    }
    for (const key in data) {
        defineRective(data, key, data[key]);
    }
}

/**
 * 渲染页面
 */
function render() {
    console.log("渲染页面");
}

/**
 * 监听对象的新增属性
 * @param {Object} data 添加属性的对象
 * @param {String} key 属性名
 * @param {*} value 属性值
 */
function $set(data, key, value) {
    if (Array.isArray(data)) {
        data.splice(key, '1', value);
        return;
    }
    defineRective(data, key, value);
    render();
    return value;
}

/**
 * 删除对象的值
 * @param {*} data 操作的对象
 * @param {String | Number} key 属性名 
 */
function $delete(data, key) {
    if (Array.isArray(data)) {
        data.splice(key, 1);
        return;
    }
    delete data[key];
    render();
}

observer(data)

$delete(data.interesting, 1);
console.log(data);