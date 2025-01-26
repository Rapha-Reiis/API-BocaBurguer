'use strict';

/** @type {import('sequelize-cli').Migration} */
export default  {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('users', {  // // Cria uma tabela chamada `users` no banco de dados.
      //Definindo as colunas do banco
      id:{
        primaryKey: true,
        allowNull: false, // Garante que a coluna `id` não pode ter valores nulos.
        type:Sequelize.UUID, // Define o tipo de dado como `UUID` (identificador único universal).
        defaultValue: Sequelize.UUIDV4 //        // Define que o valor padrão será gerado automaticamente como um UUID versão 4.
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique:true  // Define que os valores na coluna `email` devem ser únicos (sem duplicatas).
      },
      admin:{
        type: Sequelize.BOOLEAN,
        defaultValue:false  // O valor padrão para `admin` será `false` (não administrador).
      },
      created_at:{
        type:Sequelize.DATE,
        allowNull:false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      }
    });

  },

  async down (queryInterface) {  // // Método `down` é chamado para reverter a migração.

    await queryInterface.dropTable('users');
    // Remove a tabela `users` do banco de dados.
  }
};
