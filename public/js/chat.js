var chat = new Vue({
    el: '#chat',
    data: {
        new_chat_room_title: '',
        new_chat_room_description: '',
        current_room_messages: {},
        current_room_data: '',
        new_message: ''
    },
    mounted: function () {
        window.setInterval(function(){
           if(chat.current_room_index != ''){
               chat.get_data(chat.current_room_index);
           }
        }, 2000);

        if (window.location.hash.substr(1)) {
            this.change_room(window.location.hash.substr(1));
        }
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
            if (this.new_chat_room_title == '' && this.new_room_modal == true) {
                this.error_message = 'Please enter a name of the new room';
            } else if (this.new_message == '' && this.new_room_modal == false) {
                this.error_message = 'Please enter your message';
            } else {
                this.error_message = '';
            }
            return this.error_message;
        }
    },
    methods: {
        get_data: function () {
            axios.get('/rooms/' + this.current_room_index, {
            }).then(function (response) {
                chat.current_room_data = response.data.room[0];
                chat.current_room_messages = response.data.messages;
            }).catch(function (error) {
                console.log(error);
            });
        },
        close_modal: function () {
            this.display_errors = false;
            this.new_room_modal = false;
            $('#modal_create').modal().modal('close');
        },
        open_modal: function () {
            this.new_room_modal = true;
            this.display_errors = false;
            $('#modal_create').modal().modal('open');
        },
        create_room: function () {
            if (this.new_chat_room_title == '') {
                this.display_errors = true;
                return;
            }else{
                this.display_errors = false;
            }
            $('#modal_create').modal().modal('close');
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
            this.current_room_index = id;
            window.location.hash = this.current_room_index;
        },

        send_message: function () {
            if (this.new_message == '') {
                this.display_errors = true;
                return
            }
            this.display_errors = false;
            axios.post('/messages', {
                body: this.new_message,
                author: this.user_name,
                room_id: this.current_room_index
            })
                .then(function (response) {
                    chat.new_message = '';
                    if (response.data == "Message saved") {
                        document.location.href = "/chat#" + chat.current_room_index;
                        chat.get_data();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }
});