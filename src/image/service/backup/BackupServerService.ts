import {Message} from "discord.js";
import {Inject} from "typescript-ioc";
import {BackupChannelService} from "./BackupChannelService";

/**
 * @class BackupServerService
 */
export default class BackupServerService {
    @Inject
    private backupChannelService: BackupChannelService

    /**
     * Execute backup of server images.
     *
     * @param message
     * @param categories
     */
    public async execute(message: Message, categories: string[]) {
        const channels = message.guild.channels;

        channels.cache.forEach(channel => {
            if (channel.parent && categories.includes(channel.parent.name.toLowerCase())) {
                this.backupChannelService.execute(channel, message);
            }
        })
    }
}