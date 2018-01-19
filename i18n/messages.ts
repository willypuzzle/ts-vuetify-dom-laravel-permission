export default {
    it: {
        manager: {
            toolbar:  {
                selectors: {
                    type: {
                        roles: {
                            label: 'Ruoli'
                        },
                        users: {
                            label: 'Utenti'
                        }
                    }
                }
            }
        },
        permissions: {
            state: {
                disabled: {
                    text: 'Disabilitato'
                },
                enabled: {
                    text: 'Abilitato'
                }
            },
            table: {
                create: {
                    title: 'Nuovo Permesso',
                    inputs: {
                        name: {
                            label: 'Nome'
                        },
                        state: {
                            label: 'Stato'
                        }
                    }
                },
                headers: {
                    delete:{
                        text: 'Elimina'
                    },
                    id: {
                        text: 'ID'
                    },
                    name:{
                        text: 'Nome'
                    },
                    state: {
                        text: 'Stato'
                    }
                },
                inputs: {
                    name: {
                        label: 'Nome'
                    },
                    state: {
                        label: 'Stato'
                    }
                }
            }
        },
        roles: {
            state: {
                disabled: {
                    text: 'Disabilitato'
                },
                enabled: {
                    text: 'Abilitato'
                }
            },
            table: {
                create: {
                    title: 'Nuovo Ruolo',
                    inputs: {
                        name: {
                            label: 'Codice'
                        },
                        label: {
                            label: 'Nome'
                        },
                        state: {
                            label: 'Stato'
                        },
                        users: {
                            label: "Utenti"
                        }
                    }
                },
                headers: {
                    delete:{
                        text: 'Elimina'
                    },
                    id: {
                        text: 'ID'
                    },
                    name:{
                        text: 'Codice'
                    },
                    label: {
                        label: 'Nome'
                    },
                    state: {
                        text: 'Stato'
                    },
                    users:{
                        text: 'Utenti'
                    }
                },
                inputs: {
                    name: {
                        label: 'Codice'
                    },
                    state: {
                        label: 'Stato'
                    }
                },
                modify: {
                    inputs: {
                        users: {
                            label: 'Utenti'
                        }
                    },
                    users: {
                        title: 'Utenti',
                        buttons: {
                            confirm: 'Conferma',
                            dismiss: 'Annulla'
                        }
                    }
                }
            }
        },
        sections: {
            state: {
                disabled: {
                    text: 'Disabilitato'
                },
                enabled: {
                    text: 'Abilitato'
                }
            },
            table: {
                create: {
                    title: 'Nuova Sezione',
                    inputs: {
                        name: {
                            label: 'Nome'
                        },
                        state: {
                            label: 'Stato'
                        }
                    }
                },
                headers: {
                    delete:{
                        text: 'Elimina'
                    },
                    id: {
                        text: 'ID'
                    },
                    name:{
                        text: 'Nome'
                    },
                    state: {
                        text: 'Stato'
                    }
                },
                inputs: {
                    name: {
                        label: 'Nome'
                    },
                    state: {
                        label: 'Stato'
                    }
                }
            }
        },
        users: {
            state: {
                disabled: {
                    text: 'Disabilitato'
                },
                enabled: {
                    text: 'Abilitato'
                }
            },
            table: {
                headers: {
                    id: {
                        text: 'ID'
                    },
                    name: {
                        text: 'Nome'
                    },
                    delete: {
                        text: 'Elimina'
                    },
                    detail: {
                        text: 'Dettaglio'
                    },
                    roles: {
                        text: 'Ruoli'
                    },
                    state: {
                        text: 'Stato'
                    },
                    surname: {
                        text: 'Cognome'
                    }
                },
                inputs: {
                    name: {
                        label: 'Nome'
                    },
                    state: {
                        label: 'Stato'
                    },
                    surname: {
                        label: 'Cognome'
                    }
                },
                create: {
                    title: 'Nuovo Utente'
                },
                modify: {
                    roles: {
                        title: 'Ruoli',
                        buttons: {
                            confirm: 'Conferma',
                            dismiss: 'Annulla'
                        }
                    }
                }
            }
        }
    },
    en: {
        manager: {
            toolbar:  {
                selectors: {
                    type: {
                        roles: {
                            label: 'Roles'
                        },
                        users: {
                            label: 'Users'
                        }
                    }
                }
            }
        },
        permissions: {
            state: {
                disabled: {
                    text: 'Disabled'
                },
                enabled: {
                    text: 'Enabled'
                }
            },
            table: {
                create: {
                    title: 'New Permission',
                    inputs: {
                        name: {
                            label: 'Name'
                        },
                        state: {
                            label: 'State'
                        }
                    }
                },
                headers: {
                    delete:{
                        text: 'Delete'
                    },
                    id: {
                        text: 'ID'
                    },
                    name:{
                        text: 'Name'
                    },
                    state: {
                        text: 'State'
                    }
                },
                inputs: {
                    name: {
                        label: 'Name'
                    },
                    state: {
                        label: 'State'
                    }
                }
            }
        },
        roles: {
            state: {
                disabled: {
                    text: 'Disabled'
                },
                enabled: {
                    text: 'Enabled'
                }
            },
            table: {
                create: {
                    title: 'New Role',
                    inputs: {
                        name: {
                            label: 'Name'
                        },
                        state: {
                            label: 'State'
                        },
                        users: {
                            label: "Users"
                        }
                    }
                },
                headers: {
                    delete:{
                        text: 'Delete'
                    },
                    id: {
                        text: 'ID'
                    },
                    name:{
                        text: 'Name'
                    },
                    state: {
                        text: 'State'
                    },
                    users:{
                        text: 'Users'
                    }
                },
                inputs: {
                    name: {
                        label: 'Name'
                    },
                    state: {
                        label: 'State'
                    }
                },
                modify: {
                    inputs: {
                        users: {
                            label: 'Users'
                        }
                    },
                    users: {
                        title: 'Users',
                        buttons: {
                            confirm: 'Confirm',
                            dismiss: 'Dismiss'
                        }
                    }
                }
            }
        },
        sections: {
            state: {
                disabled: {
                    text: 'Disabled'
                },
                enabled: {
                    text: 'Enabled'
                }
            },
            table: {
                create: {
                    title: 'New Section',
                    inputs: {
                        name: {
                            label: 'Name'
                        },
                        state: {
                            label: 'State'
                        }
                    }
                },
                headers: {
                    delete:{
                        text: 'Delete'
                    },
                    id: {
                        text: 'ID'
                    },
                    name:{
                        text: 'Name'
                    },
                    state: {
                        text: 'State'
                    }
                },
                inputs: {
                    name: {
                        label: 'Name'
                    },
                    state: {
                        label: 'State'
                    }
                }
            }
        },
        users: {
            state: {
                disabled: {
                    text: 'Disabled'
                },
                enabled: {
                    text: 'Enabled'
                }
            },
            table: {
                headers: {
                    id: {
                        text: 'ID'
                    },
                    name: {
                        text: 'Name'
                    },
                    delete: {
                        text: 'Delete'
                    },
                    detail: {
                        text: 'Detail'
                    },
                    roles: {
                        text: 'Roles'
                    },
                    state: {
                        text: 'State'
                    },
                    surname: {
                        text: 'Surname'
                    }
                },
                inputs: {
                    name: {
                        label: 'Name'
                    },
                    state: {
                        label: 'State'
                    },
                    surname: {
                        label: 'Surname'
                    },
                },
                create: {
                    title: 'New User'
                },
                modify: {
                    roles: {
                        title: 'Roles',
                        buttons: {
                            confirm: 'Confirm',
                            dismiss: 'Dismiss'
                        }
                    }
                }
            }
        }
    }
}