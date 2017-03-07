var chat = new Vue({
    el: '#chat',
    data: {
        new_chat_room_title: '',
        new_chat_room_description: '',
        current_room_messages: {},
        current_room_data: ''
    },
    mounted: function () {
        if (!sessionStorage.getItem("mandatory_chat_user") || !sessionStorage.getItem("mandatory_chat_user_id")) {
            document.location.href = "/";
        }
    },
    props: {
        current_room_index: {default: 0},
        new_room_modal: {default: false},
        display_errors: {default: false},
        error_message: {default: ''},
        user_name: {default: sessionStorage.getItem("mandatory_chat_user")},
        user_id: {default: sessionStorage.getItem("mandatory_chat_user_id")}
    },
    computed: {
        has_errors: function () {
            if (this.new_chat_room_title == '') {
                this.error_message = 'Please insert name of the chat room';
            } else {
                this.error_message = '';
            }
            return this.error_message;
        }
    },
    methods: {
        get_data: function () {
            axios.get('/rooms/' + this.current_room_index, {
                name: this.new_chat_room_title,
                description: this.new_chat_room_description,
                author: this.user_name
            }).then(function (response) {
                chat.current_room_data = response.data.room[0];
                chat.current_room_messages = response.data.messages;
            }).catch(function (error) {
                console.log(error);
            });
        },
        close_modal: function (modal) {
            this[modal] = false;
            this.new_room_modal = false;
            this.display_errors = false;
            this.error_message = '';
            this.new_chat_room_title = '';
            this.new_chat_room_description = '';

        },
        create_room: function () {
            if (this.new_chat_room_title) {
                this.display_errors = true;
            }
            axios.post('/rooms', {
                name: this.new_chat_room_title,
                description: this.new_chat_room_description,
                author: this.user_name
            })
                .then(function (response) {
                    if (response.data == "Room saved") {
                        document.location.href = "/chat";
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        },
        change_room: function (id) {
            console.log(id);
            this.current_room_index = id;
            this.get_data();
        }

    }
});