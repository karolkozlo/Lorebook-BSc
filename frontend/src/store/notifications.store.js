const notificationsModule = {
    namespaced: true,
    state() {
        return {
            isNotificationOpen: false,
            notificationType: '',
            message: ''
        };
    },
    mutations: {
        notify(state, payload) {
            state.notificationType = payload.type;
            state.message = payload.message;
            state.isNotificationOpen = true;
        },
        closeNotification(state) {
            state.notificationType = '';
            state.message = '';
            state.isNotificationOpen = false;
        }
    },
    getters: {
        isNotificationOpen(state) {
            return state.isNotificationOpen;
        },
        notificationMessage(state) {
            return state.message;
        },
        notificationType(state) {
            return state.notificationType;
        }
    }
};

export default notificationsModule;