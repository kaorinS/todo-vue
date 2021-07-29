import Vue from 'vue'

new Vue({
    el: '#app',
    data: {
        newItem: '',
        keyword: '',
        todos: [
            {
                id: 1,
                item: 'サンプルTODOタスク',
                editItem: 'サンプルTODOタスク',
                isDone: false,
                editMode: false,
                keydownCode: ''
            },
            {
                id: 2,
                item: 'サンプルDONEタスク',
                editItem: 'サンプルDONEタスク',
                isDone: true,
                editMode: false,
                keydownCode: ''
            }
        ],
    },
    computed: {
        filterTodos: function () {
            let todos = [];

            for (let i in this.todos) {
                let todo = this.todos[i];
                // 部分一致
                if (todo.item.indexOf(this.keyword) > -1) {
                    todos.push(todo);
                }
                // 前方一致
                // if (todo.item && todo.item.match(new RegExp("^" + this.keyword))) {
                //     todos.push(todo);
                // }
            }

            return todos;
        }
    },
    methods: {
        addItem: function () {
            // alert();
            if (this.newItem === '') return; //タスク未入力の場合は追加しない
            let nextId = this.todos.length;
            let todo = {
                id: ++nextId,
                item: this.newItem,
                editItem: this.newItem,
                isDone: false,
                editMode: false,
                keydownCode: ''
            };
            this.todos.push(todo); //todosの配列にtodoを追加する
            this.newItem = ''  //タスク追加後、入力フォームを空にする
        },
        deleteItem: function (i) { //indexを引数に設定
            this.todos.splice(i, 1) //indexで指定された要素を1つ削除
        },
        changeState: function (todo) {
            // this.todos[i].isDone = !this.todos[i].isDone
            todo.isDone = !todo.isDone
        },
        editStart: function (todo, i) {
            todo.editMode = true
            this.$nextTick(() => {
                this.$refs.editArea[i].focus()
            })
        },
        editAreaFocus: function (i) {
            this.$refs.editArea[i].select()
        },
        getKeydown: function (e, todo) {
            todo.keydownCode = e.which
        },
        removeFocus: function (e, todo, i) {
            if ((13 === todo.keydownCode && e.which === 13) || (e.keycode === 13 && e.shiftKey === true)) {
                this.$refs.editArea[i].blur()
            }
        },
        editEnd: function (todo) {
            if (!todo.editItem || todo.editItem === "") {
                todo.editItem = todo.item
            }
            todo.item = todo.editItem
            todo.editMode = false
        }
    }
})