const Discord = require('discord.js');
const Client = new Discord.Client();

const prefix = ['C'];




console.log(' Im Ready ! ')


Client.on('message', async message => {
  var command = message.content.toLowerCase().split(" ")[0];
  var prefix = '-';
  var name = '';
  var age = '';
  var fromwhere = '';
  var fa2dh = '';
  var filter = m => m.author.id === message.author.id;
  var subChannel = message.guild.channels.find(c => c.name === 'التقديمات');
 
  if(command == prefix + 'apply') {
      if(message.author.bot) return;
      if(message.channel.type === 'dm') return;

      var modRole = message.guild.roles.find(r => r.name === 'staff');
     
      if(message.guild.member(message.author).roles.has(modRole.id)) return message.channel.send(':x: | معك الرتبة');
      if(!subChannel) return message.channel.send(':x: | يجب ان يتوفر روم اسمه `التقديمات`');
     
      message.channel.send(':timer: | **اكتب اسمك الحقيقي الان من فضلك**').then(msgS => {
          message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(collected => {
              name = collected.first().content;
              collected.first().delete();
              msgS.edit(':timer: | **من فضلك اكتب عمرك الان**').then(msgS => {
                  message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(collected => {
                      age = collected.first().content;
                      collected.first().delete();
                      msgS.edit(':timer: | **من فضلك اكتب من اي بلد انت**').then(msgS => {
                          message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(collected => {
                              fromwhere = collected.first().content;
                              collected.first().delete();
                              msgS.edit(':timer: | **من فضلك اكتب سبب تقديمك على الرتبة والمهارات اللتي لديك لتقديمها**').then(msgS => {
                                  message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(collected => {
                                      fa2dh = collected.first().content;
                                      collected.first().delete();
                                     
                                      let embedS = new Discord.RichEmbed()
                                      .setAuthor(message.author.tag, message.author.avatarURL)
                                      .setThumbnail(message.author.avatarURL)
                                      .setDescription('**\n:no_entry: هل انت متأكد انك تريد التقديم؟**')
                                      .setColor('GREEN')
                                      .addField('الاسم', name, true)
                                      .addField('العمر', age, true)
                                      .addField('من وين', fromwhere, true)
                                      .addField('المهارات وسبب التقديم على الرتبة', fa2dh, true)
                                      .setTimestamp()
                                      .setFooter(message.guild.name, message.guild.iconURL)
                                     
                                      msgS.delete();
                                      message.channel.send(embedS).then(msgS => {
                                          msgS.react('✅').then(() => msgS.react('❎'))
                                         
                                          let yesSure = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
                                          let no = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
                                         
                                          let yesSend = msgS.createReactionCollector(yesSure);
                                          let dontSend = msgS.createReactionCollector(no);
                                         
                                          yesSend.on('collect', r => {
                                              msgS.delete();
                                              message.channel.send(':white_check_mark: | تم تقديم طلبك بنجاح انتظر النتيجة في روم #التقديمات').then(msg => msg.delete(5000));
                                             
                                              let subMsg = new Discord.RichEmbed()
                                              .setAuthor(message.author.tag, message.author.avatarURL)
                                              .setColor('GREEN')
                                              .setThumbnail(message.author.avatarURL)
                                              .addField('الاسم', name)
                                              .addField('العمر', age)
                                              .addField('من وين', fromwhere)
                                              .addField('لماذا يريد التقديم', fa2dh)
                                              .addField('حسابه', message.author)
                                              .addField('ايدي حسابه', message.author.id, true)
                                             
                                              subChannel.send(subMsg).then(msgS => {
                                                  msgS.react('✅').then(() => msgS.react('❎'))
                                                 
                                                  let accept = (reaction, user) => reaction.emoji.name === '✅'  && user.id === '280749272498962432'
                                                  let noAccept = (reaction, user) => reaction.emoji.name === '❎' && user.id === '280749272498962432'
                                                 
                                                  let acceptRe = msgS.createReactionCollector(accept);
                                                  let noAcceptRe = msgS.createReactionCollector(noAccept);
                                                 
                                                  acceptRe.on('collect', r => {
                                                      msgS.delete();
                                                      message.author.send(`:white_check_mark: | تم قبولك اداري بسيرفر **${message.guild.name}**`);
                                                      message.guild.member(message.author).addRole(modRole.id);
                                                      message.guild.channels.find(r => r.name === 'قبول-رفض').send(`:white_check_mark: | تم قبولك [ <@${message.author.id}> ]`);
                                                  }).catch();
                                                  noAcceptRe.on('collect', r => {
                                                      msgS.delete();
                                                      message.author.send(`:x: | تم رفضك بسيرفر **${message.guild.name}**`);
                                                      message.guild.channels.find(r => r.name === 'قبول-رفض').send(`:x: | تم رفضك [ <@${message.author.id}> ]`);
                                                  }).catch();
                                              })
                                          });
                                          dontSend.on('collect', r => {
                                              msgS.delete();
                                              message.channel.send(':x: | تم الغاء تقديمك');
                                          });
                                      })
                                  })
                              })
                          })
                      })
                  })
              })
          })
      })
  }
});




Client.login(process.env.BOT_TOKEN);




