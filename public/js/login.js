var login_form = new Vue({
    el: '#login',
    props: {
        loading_status: {default: false},
        loading_status_message: {default: ''},
        user_login: {default: ''},
        display_errors: {default: false},
        error_message: {default: ''}
    },
    computed: {
        has_errors: {
            get: function () {
                if (this.user_login == '') {
                    this.error_message = 'Please insert your name';
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
            this.display_errors = true;
            if (this.user_login != '') {
                if (this.check_nickname() == 'success') {
                    console.log('redirect');
                }
            }
        },
        check_nickname: function () {
            // make it working with axios
            this.loading_status = true;
            if (this.user_login == 'daniel') {
                this.error_message = 'Sorry nickname is taken';
                this.loading_status = false;
            }
        }
    }
});