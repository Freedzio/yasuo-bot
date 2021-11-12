import { MessageEmbed } from "discord.js";
import { bootMessage } from "./bootMessage";

export const embed = new MessageEmbed()
  .setTitle(bootMessage)
  .setColor("RED")
  // .setImage("https://www.gry-online.pl/Galeria/Html/Wiadomosci/449768375.jpg")
  .setDescription("Przedstawiam dostępne komendy:")
  .addField(
    "!gif <temat gifa>",
    "podaj słowo klucz i poszukam odpowiedniego GIFa"
  )
  .addField("!play albo !p <fraza>", "puśc muzyczkę")
  .addField("!skip", "skipnij utwór")
  .addField("!stop", "usuń playlistę")
  .addField("!timer <czas>", "uruchom timer na X sekund, minut lub godzin")
  .addField(
    "!spotify <nazwa playlisty>",
    "podaj nazwę playlisty, aby otrzymać do niej link (na razie znajduję tylko playlisty na koncie mojego Pana i Stwórcy)"
  )
  .addField("!pokadupe", "spróbuj szczęścia ;)");
