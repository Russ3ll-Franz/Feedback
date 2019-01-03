import { GetUserDTO } from './../models/user/get-user.dto';
import { AdminPanelService } from './admin-panel.service';
import { Controller, Post, UseGuards, Query, BadRequestException, Body } from '@nestjs/common';
import { Roles } from 'src/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';

@Controller('admin-panel')
export class AdminPanelController {

    constructor(private readonly adminPanelSerrvice: AdminPanelService) { }

    @Post('/role')

    @Roles('Admin')
    @UseGuards(AuthGuard(), RolesGuard)
    changeRole(@Body() user: GetUserDTO) {
        if (!(+user.username) && !(+user.role)) {
            return this.adminPanelSerrvice.changeUserRole(user);
        }
        throw new BadRequestException('Username or role cannot be number');
    }
}
