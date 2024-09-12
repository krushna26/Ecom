const nodemailer=require('nodemailer');


const transporter=nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    secure:false,
    requireTLS:true,
    auth:{
        user:process.env.SMTP_MAIL,
        pass:process.env.SMTP_PASSWORD
    }
});


const sendmail=async(mail,subject,content)=>{
    try {
        
        var mailOptions={
            from:process.env.SMTP_MAIL,
            to:mail,
            subject:subject,
            html:content
        }
        transporter.sendMail(mailOptions,(error,info)=>{
            if (error){
                console.log(error);
                
            }
            console.log('mail sent',info.messageId);
            
        })


    } catch (error) {
        
    }
}