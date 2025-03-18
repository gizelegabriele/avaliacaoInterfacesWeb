## Avalição Individual - Fase 01 Interfaces Web 
Essa avaliação consiste em aprimorar uma API existente, focando em robustez e segurança. 

#### As tarefas incluem:
* Adicionar tratamento de erros com try-catch e status codes HTTP,
* Identificar relacionamentos entre entidades, 
* Implementar autenticação com JWT e corrigir erros de compilação.
* Identificar/Criar mais relacionamentos 

# 📌 Resumo do que foi aplicado:  

#### ✅ Configuração e Estruturação  
- Instalação das dependências essenciais.  
- Criação do **Index.js** como ponto de entrada da aplicação.  
- Exportação correta dos **models** nos **controllers** utilizando `module.exports`.  

#### 🔐 Autenticação e Segurança  
- Implementação de **middleware de autenticação** com JWT.  
- Adição do atributo **senha**.  
- Uso do método `pre("save")` para **hashificação da senha** antes de salvar no banco.  
- Método para verificar se a senha fornecida corresponde à armazenada.   

#### 🛠 Tratamento de Erros e Funcionalidades  
- Implementação de **try-catch** para captura e resposta adequada de erros com status HTTP.  
- Criação da **função de registrar/login**, gerando **tokens de autenticação**.  

#### 🔗 Relacionamentos entre Entidades  
- **1:1** → Aluno ↔ Perfil.  
- **1:N** → Aluno ↔ Tarefas.  
- **N:M** → Disciplina ↔ Tarefa.

#### *Video (com explicação das alterações):* 
https://github.com/user-attachments/assets/699bb1c5-046c-4bb5-9521-acc401f7fb70


