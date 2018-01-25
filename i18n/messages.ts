export default {
    it: {
        general: {
            close:{
                label: 'Chiudi'
            }
        },
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
        permissions_sections: {
            errors: {
                section_types: {
                    reference_error:{
                        title: "Errore di riferimento",
                        content: 'Il modulo o i moduli che si stanno cercando di eliminare sono referenziati nella tabella delle sezioni'
                    }
                }
            },
            general: {
                sections: {
                    label: 'Sezioni'
                },
                section_types: {
                    label: 'Moduli'
                }
            },
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
                    title: {
                        permissions: 'Nuovo Permesso',
                        section_types: 'Nuovo Modulo',
                        sections: 'Nuova Sezione',
                    },
                    inputs: {
                        name: {
                            label: 'Codice'
                        },
                        label: {
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
                        text: 'Codice'
                    },
                    label:{
                        text: 'Nome'
                    },
                    state: {
                        text: 'Stato'
                    }
                },
                inputs: {
                    name: {
                        label: 'Codice'
                    },
                    label:{
                        text: 'Nome'
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
                        text: 'Nome'
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
        general: {
            close:{
                label: 'Close'
            }
        },
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
        permissions_sections: {
            errors: {
                section_types: {
                    reference_error:{
                        title: "Reference Error",
                        content: 'Modules you are trying to delete are referenced in sections table'
                    }
                }
            },
            general: {
                sections: {
                    label: 'Sections'
                },
                section_types: {
                    label: 'Modules'
                }
            },
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
                    title: {
                        permissions: 'New Permission',
                        section_types: 'New Module',
                        sections: 'New Section',
                    },
                    inputs: {
                        name: {
                            label: 'Code'
                        },
                        label: {
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
                        text: 'Code'
                    },
                    label:{
                        text: 'Name'
                    },
                    state: {
                        text: 'State'
                    }
                },
                inputs: {
                    name: {
                        label: 'Code'
                    },
                    label: {
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
                        text: 'Code'
                    },
                    label: {
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