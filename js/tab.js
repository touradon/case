var that = null;
class Tab {
    constructor(id) {
        // 获取元素
        that = this;
        this.main = document.querySelector(id);
        this.tabList = this.main.querySelector('.tab-list');
        this.content = this.main.querySelector('.tab-content');
        this.add = this.main.querySelector('.tabadd');
        this.init();
    }
    // 初始化，注册事件
    init() {
        // 初始化时，获取所有的 tab-item 和 content-item
        this.updateNode();

        // addbar 按钮注册事件
        this.add.onclick = this.addTab;

        // tab 按钮注册事件
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i; // 记录当前 tab 的索引号
            this.lis[i].onclick = this.toogleTab;
            this.remove[i].onclick = this.removeTab;
            this.oSpan[i].ondblclick = this.editTab;
            this.contentItem[i].ondblclick = this.editTab;
        }
    }

    // 获取 tab-item 和 content-item
    updateNode() {
        this.lis = this.main.querySelectorAll('.tab-item');
        this.contentItem = this.main.querySelectorAll('.content-item');
        this.remove = this.main.querySelectorAll('.close');
        this.oSpan = this.main.querySelectorAll('.tab-item span');
    }

    // 切换功能
    toogleTab() {
        that.clearClass(); // 调用 clearClass
        this.classList.add('active');
        that.contentItem[this.index].classList.add('active');
    }
    // 清除类名
    clearClass() {
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].classList.remove('active');
            this.contentItem[i].classList.remove('active');
        }
    }

    // 添加功能
    addTab() {
        that.clearClass();
        // 第一步：创建选项卡
        let oLi = '<li class="tab-item active"><span>新选项卡</span><i class="close fa fa-close"></i></li>';
        let oDiv = '<section class="content-item active">主体内容' + Math.random() + '+</section>';

        // 第二步：添加创建的子元素到对应的父元素中
        that.tabList.insertAdjacentHTML('beforeend', oLi);
        that.content.insertAdjacentHTML('beforeend', oDiv);
        that.init();
    }
    // 删除功能
    removeTab(e) {
        e.stopPropagation(); // 阻止冒泡
        let index = this.parentNode.index;

        that.lis[index].remove();
        that.contentItem[index].remove();

        that.init();
        // 当我们删除的不是选定状态的 tab-item 时， 原来的选定状态保持不变
        if (document.querySelector('.tab-item .active')) return;

        // 当我们删除了选定状态的元素时，让他的前一个元素处于选中状态
        index--;
        that.lis[index] && that.lis[index].click();
    }

    //修改功能
    editTab(e) {
        var str = this.innerHTML; // 获取 span 的内容
        // 双击禁止选中文字
        // window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection.empt();
        this.innerHTML = '<input type="text"/>';
        var input = this.children[0];
        input.value = str;
        input.select();  // 默认文字处于选定状态
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        }

        // 按下回车
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {
                input.blur(); // 自动失去加点
            }
        }
    }
}

new Tab('#tab');