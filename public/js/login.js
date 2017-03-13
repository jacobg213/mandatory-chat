function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4();
}

var login_form = new Vue({
    el: '#login',
    props: {
        user_login: {default: ''},
        display_errors: {default: false},
        error_message: {default: ''}
    },
    mounted: function () {
        this.redirect_to_chat();
    },
    computed: {
        has_errors: {
            get: function () {
                if (this.user_login == '') {
                    this.error_message = 'Please enter your nickname';
                }
                return this.error_message;
            },
            set: function (newValue) {
                this.error_message = newValue;
            }
        }
    },
    methods: {
        login: function () {
            if (this.user_login != '') {
                sessionStorage.setItem('mandatory_chat_user', this.user_login);
                sessionStorage.setItem('mandatory_chat_user_id', guid());
               this.redirect_to_chat();
            }else{
                this.display_errors = true;
            }
        },
        redirect_to_chat: function () {
            if(sessionStorage.getItem("mandatory_chat_user") && sessionStorage.getItem("mandatory_chat_user_id")){
                document.location.href = "/chat";
            }
        }
    }
});