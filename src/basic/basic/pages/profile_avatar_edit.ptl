Div(row){
    Div(col-md-12){
        Form(panel){
            Div(panel-body){
                Div(list-group){
                    Div(row){
                        Div(col-md-12 mc-sm text-left){
                            Label(For: member_image, Class: pv-lg){
                                Span(Body: Select your image, Class: text-info)
                            }
                            Input(Name: member_image, Type: file)
                            Div(clearfix){
                                Button(Body: LangRes(save), Class: btn btn-primary pull-right,Contract: Profile_Avatar_Edit, Page: profile_edit,PageParams:"v_member_id=#v_member_id#").Alert(Text: $want_save_changes$, ConfirmButton: $yes$, CancelButton: $no$, Icon: question)
                                Button(Body: LangRes(Close), Class: btn btn-danger pull-right, Page: profile_edit,PageParams:"v_member_id=#v_member_id#")
                            }.Style(padding-top: 50px;)
                        }
                    }
                }
            }
        }
    }
}
