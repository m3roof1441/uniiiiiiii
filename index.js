const Discord = require('discord.js');
const Client = new Discord.Client();

const prefix = ['-'];




console.log(' Im Ready ! ')


Client.on('message', async message => {
  var command = message.content.toLowerCase().split(" ")[0];
  var prefix = '-';
  var name = '';
  var age = '';
  var fromwhere = '';
  var fa2dh = '';
  var filter = m => m.author.id === message.author.id;
  var subChannel = message.guild.channels.find(c => c.name === 'submits');
 
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
                                              message.channel.send(':white_check_mark: | تم تقديم طلبك بنجاح انتظر النتيجة في روم #submits').then(msg => msg.delete(5000));
                                             
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
                                                      message.guild.channels.find(r => r.name === 'accepted-refused').send(`:white_check_mark: | تم قبولك [ <@${message.author.id}> ]`);
                                                  }).catch();
                                                  noAcceptRe.on('collect', r => {
                                                      msgS.delete();
                                                      message.author.send(`:x: | تم رفضك بسيرفر **${message.guild.name}**`);
                                                      message.guild.channels.find(r => r.name === 'accepted-refused').send(`:x: | تم رفضك [ <@${message.author.id}> ]`);
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

const devs = ["280749272498962432" , "494529176372772865"];
const adminprefix = ["-"];
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!devs.includes(message.author.id)) return;

  if (message.content.startsWith(adminprefix + 'ply')) {
    client.user.setGame(argresult);
      message.channel.send(`**✅   ${argresult}**`)
  } else
     if (message.content === (adminprefix + "leave")) {
    message.guild.leave();
  } else
  if (message.content.startsWith(adminprefix + 'wt')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send(`**✅   ${argresult}**`)
  } else
  if (message.content.startsWith(adminprefix + 'ls')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send(`**✅   ${argresult}**`)
  } else
  if (message.content.startsWith(adminprefix + 'st')) {
    client.user.setGame(argresult, "https://www.twitch.tv/idk");
      message.channel.send(`**✅**`)
  }
  if (message.content.startsWith(adminprefix + 'setname')) {
  client.user.setUsername(argresult).then
      message.channel.send(`Changing The Name To ..**${argresult}** `)
} else
if (message.content.startsWith(adminprefix + 'setavatar')) {
  client.user.setAvatar(argresult);
    message.channel.send(`Changing The Avatar To :**${argresult}** `);
}
});
client.on('message',async message => {
    if(message.content.startsWith(prefix + "bc")) {
      let filter = m => m.author.id === message.author.id;
      let thisMessage;
      let thisFalse;
      message.channel.send(':regional_indicator_b::regional_indicator_c:| **ارسل الرسالة الان**').then(msg => {

      let awaitM = message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ['time']
      })
      .then(collected => {
        collected.first().delete();
        thisMessage = collected.first().content;
        msg.edit(':regional_indicator_b::regional_indicator_c:| **هل انت متأكد؟**');
        let awaitY = message.channel.awaitMessages(response => response.content === 'نعم' || 'لا' && filter,{
          max: 1,
          time: 20000,
          errors: ['time']
        })
        .then(collected => {
          if(collected.first().content === 'لا') {
            msg.delete();
            message.delete();
            thisFalse = false;
          }
          if(collected.first().content === 'نعم') {
            if(thisFalse === false) return;
          message.guild.members.forEach(member => {
            msg.edit(':regional_indicator_b::regional_indicator_c:| **جاري الارسال**');
            collected.first().delete();
            member.send(`${thisMessage}\n\n${member} ,\nتم الارسال من : ${message.guild.name}\n تم الارسال بواسطة : ${message.author.tag}`);
          });
          }
        });
      });
      });
    }
  });


Client.login(process.env.BOT_TOKEN);




