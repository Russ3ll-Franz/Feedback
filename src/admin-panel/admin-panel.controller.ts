
import { AdminPanelService } from './admin-panel.service';
import { Controller, Post, UseGuards, Query, BadRequestException, Body, Get, Param } from '@nestjs/common';
import { Roles } from 'src/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { ChangeRoleDTO } from 'src/models/adminpanel/change-role.dto';

@Controller('admin-panel')
export class AdminPanelController {

    constructor(private readonly adminPanelSerrvice: AdminPanelService) { }

    @Post('/role')

    @Roles('Admin')
    @UseGuards(AuthGuard(), RolesGuard)
    changeRole(@Body() user: ChangeRoleDTO) {
        if (user.role !== 'User' && user.role !== 'Admin' && user.role !== 'Banned' && user.role !== 'Team Lead'){
            throw new BadRequestException('The role you have entered is invalid!')
        }
        return this.adminPanelSerrvice.changeUserRole(user);
    }


    @Get('/role')

    @Roles('Admin')
    @UseGuards(AuthGuard(), RolesGuard)
    getRole(@Param() par) {
        if (par.username){
         this.adminPanelSerrvice.getUserRole(par);
        }
    }
}
