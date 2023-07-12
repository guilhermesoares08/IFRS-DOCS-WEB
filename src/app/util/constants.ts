export class Constants {
    static readonly DATE_FMT = 'dd/MM/yyyy';
    static readonly DATE_TIME_FMT = `${Constants.DATE_FMT} hh:mm`
    static readonly LOGIN_TOKEN = 'token';
    static readonly LOGIN_USER =  'login';
    static readonly USER_USERNAME = 'username';

    static readonly statusColors = {
        Pendente: '#2780e3',
        EmAndamento: '#373a3c',
        Atendida: '#3fb618',
        AguardandoRetirada: '#9954bb',
        Cancelada: '#ff0039'
    };
}
