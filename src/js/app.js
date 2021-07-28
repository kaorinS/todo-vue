import Vue from 'vue'

new Vue({
    el: '#app',
    data: {
        newItem: "",
        todos: []
    },
    methods: {
        addItem: function (e) {
            // alert();
            if (this.newItem === '') return; //タスク未入力の場合は追加しない
            let todo = {
                item: this.newItem,
                isDone : false
            };
            this.todos.push(todo); //todosの配列にtodoを追加する
            this.newItem = ''  //タスク追加後、入力フォームを空にする
        }
    }
})