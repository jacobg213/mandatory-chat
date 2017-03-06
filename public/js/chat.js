var chat = new Vue({
    el: '#chat',
    data: {
        new_chat_room_title: '',
        new_chat_room_description: ''
    },
    mounted: function () {
        if(!sessionStorage.getItem("mandatory_chat_user") || !sessionStorage.getItem("mandatory_chat_user_id")){
            document.location.href = "/";
        }
    },
    props: {
        new_room_modal: {default: false},
        display_errors: {default: false},
        error_message: {default: ''},
        user_name: {default: sessionStorage.getItem("mandatory_chat_user")},
        user_id: {default: sessionStorage.getItem("mandatory_chat_user_id")}
    },
    computed: {
        has_errors: function(){
            if (this.new_chat_room_title == '') {
                this.error_message = 'Please insert name of the chat room';
            }else{
                this.error_message = '';
            }
            return this.error_message;
        }
    },
    methods: {
        close_modal: function (modal) {
            this[modal] = false;
            this.new_room_modal = false;
            this.display_errors = false;
            this.error_message = '';
            this.new_chat_room_title = '';
            this.new_chat_room_description = '';

        },
        create_room: function () {
            this.display_errors = true;
        }

    }
});