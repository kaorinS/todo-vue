import Vue from 'vue'

new Vue({
    el: '#app',
    data: {
        newItem: "",
        todos: [
            {
                item: 'サンプルTODOタスク',
                isDone: false,
                editMode: false
            },
            {
                item: 'サンプルDONEタスク',
                isDone: true,
                editMode: false
            }
        ],
    },
    methods: {
        addItem: function () {
            // alert();
            if (this.newItem === '') return; //タスク未入力の場合は追加しない
            let todo = {
                item: this.newItem,
                isDone: false,
                editMode: false
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
        editStart: function (todo) {
            todo.editMode = true
        }
    }
})