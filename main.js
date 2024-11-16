
const app = Vue.createApp({
  data(){
    return {
      searchText: '',
      firstName: 'Caio',
      lastName: 'Duarte',
      email: 'caio.duarte@campuscode.com.br',
      city: 'Cajamar',
      picture: 'https://randomuser.me/api/portraits/men/57.jpg',

      listContacts: [
        // {
        //   firstName: 'Roberto',
        //   lastName: 'Soares',
        //   email: 'roberto@campuscode.com.br',
        //   city: 'Campinas',
        //   picture: 'https://randomuser.me/api/portraits/men/58.jpg',
        // },
        // {
        //   firstName: 'Renata',
        //   lastName: 'Silva',
        //   email: 'renata@campuscode.com.br',
        //   city: 'São Paulo',
        //   picture: 'https://randomuser.me/api/portraits/women/58.jpg',
        // },
        // {
        //   firstName: 'Gabriela',
        //   lastName: 'Silva',
        //   email: 'gabriela@campuscode.com.br',
        //   city: 'Salvador',
        //   picture: 'https://randomuser.me/api/portraits/women/26.jpg',
        // },
      ]
    }
  },
  computed: {
    listResult(){
      if(this.searchText){
        return this.listContacts.filter(contact => {
          return contact.firstName.toLowerCase().includes(this.searchText.toLowerCase());
        });
      } else {
        return this.listContacts;
      }
    }
  },
  async mounted(){
    this.listResult = await this.getData();
  },
  methods:{
    changeData() {
      this.firstName = 'Maria'
      this.lastName = 'Silva'
      this.email = 'maria@gmail.com'
      this.city = 'São Roque'
      this.picture = 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    removeContact(index){
      // console.log("Index do objeto selecionado: " + index);

      this.listContacts.splice(index, 1)
    },
    async getData(){
      let response = await fetch('https://randomuser.me/api/?results=15');

      //Armazenando os dados do json
      let data = await response.json();

      this.listContacts = []

      data.results.forEach(item => {
        var contact = new Object();

        contact.picture = item.picture.large
        contact.firstName = item.name.first;
        contact.lastName = item.name.last;
        contact.email = item.email;
        contact.city = item.location.city;

        this.listContacts.push(contact);

      });
    }
  }
})

app.mount('#app');