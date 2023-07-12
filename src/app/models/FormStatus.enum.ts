export enum FormStatus {
    Pendente = 0,
    EmAndamento = 1,
    Atendida = 2,
    AguardandoRetirada = 3,
    Cancelada = 4,
  } 

  export enum FormStatusInt {
    Pendente = FormStatus.Pendente,
    EmAndamento = FormStatus.EmAndamento,
    Atendida = FormStatus.Atendida,
    AguardandoRetirada = FormStatus.AguardandoRetirada,
    Cancelada = FormStatus.Cancelada,
  }